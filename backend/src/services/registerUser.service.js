import { ApiError } from "../utils/ApiError.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { verifyAndConsumePhoneOtp } from "../utils/phoneOtp.js";

export function normalizeUserString(v) {
  if (v === undefined || v === null) return "";
  return String(v).trim();
}

function normalizeString(v) {
  return normalizeUserString(v);
}

/** Login with either email or phone (exactly one should be sent). */
export function resolveLoginIdentifier(body) {
  const email = normalizeString(body?.email).toLowerCase();
  const phone = normalizeString(body?.phone);
  if (email) return { field: "email", value: email };
  if (phone) return { field: "phone", value: phone };
  return null;
}

export async function assertUserRoleAndPassword(supabase, { field, value, password, role }) {
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id,email,phone,password_hash,role,email_verified,phone_verified")
    .eq(field, value)
    .eq("role", role)
    .maybeSingle();

  if (userError) throw new ApiError(500, userError.message);
  if (!user) throw new ApiError(401, "User not found");

  const ok = await comparePassword(password, user.password_hash);
  if (!ok) throw new ApiError(401, "Invalid password");

  return user;
}

/**
 * Inserts only into `users` (see users.model.sql).
 * - registrationType "email": email + password; email_verified stays false until you add email verification.
 * - registrationType "phone": phone + password + otp (verified against phone_otps); phone_verified set true.
 */
export async function registerUserInDb(supabase, body, role) {
  if (role !== "employer" && role !== "jobseeker") {
    throw new ApiError(500, "Invalid role");
  }

  const registrationType = normalizeString(body?.registrationType).toLowerCase();
  const password = normalizeString(body?.password);

  if (!password) throw new ApiError(400, "password is required");

  if (registrationType === "email") {
    const email = normalizeString(body?.email).toLowerCase();
    if (!email) throw new ApiError(400, "email is required for email registration");

    const { data: existing, error: existingErr } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingErr) throw new ApiError(500, existingErr.message);
    if (existing) throw new ApiError(409, "User with this email already exists");

    const passwordHash = await hashPassword(password);

    const { data: created, error: insertErr } = await supabase
      .from("users")
      .insert({
        email,
        phone: null,
        password_hash: passwordHash,
        email_verified: false,
        phone_verified: false,
        role,
      })
      .select("id,email,phone,role,email_verified,phone_verified,created_at")
      .single();

    if (insertErr) throw new ApiError(500, insertErr.message);
    return created;
  }

  if (registrationType === "phone") {
    const phone = normalizeString(body?.phone);
    const otp = normalizeString(body?.otp);

    if (!phone) throw new ApiError(400, "phone is required for phone registration");
    if (!otp) throw new ApiError(400, "otp is required for phone registration");

    const otpResult = await verifyAndConsumePhoneOtp(supabase, phone, otp);
    if (!otpResult.ok) {
      throw new ApiError(400, "Invalid or expired OTP");
    }

    const { data: existing, error: existingErr } = await supabase
      .from("users")
      .select("id")
      .eq("phone", phone)
      .maybeSingle();

    if (existingErr) throw new ApiError(500, existingErr.message);
    if (existing) throw new ApiError(409, "User with this phone already exists");

    const passwordHash = await hashPassword(password);

    const { data: created, error: insertErr } = await supabase
      .from("users")
      .insert({
        email: null,
        phone,
        password_hash: passwordHash,
        email_verified: false,
        phone_verified: true,
        role,
      })
      .select("id,email,phone,role,email_verified,phone_verified,created_at")
      .single();

    if (insertErr) throw new ApiError(500, insertErr.message);
    return created;
  }

  throw new ApiError(400, 'registrationType must be "email" or "phone"');
}
