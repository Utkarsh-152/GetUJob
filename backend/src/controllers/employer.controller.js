import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import supabase from "../db/index.js";
import {
  registerUserInDb,
  resolveLoginIdentifier,
  assertUserRoleAndPassword,
  normalizeUserString,
} from "../services/registerUser.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import crypto from "crypto";

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

const registerEmployer = asyncHandler(async (req, res) => {
  const created = await registerUserInDb(supabase, req.body, "employer");

  return res
    .status(201)
    .json(
      new ApiResponse(201, { user: created }, "Employer registered successfully")
    );
});

const loginEmployer = asyncHandler(async (req, res) => {
  const password = normalizeUserString(req.body?.password);
  const id = resolveLoginIdentifier(req.body);

  if (!id) {
    throw new ApiError(400, "email or phone is required for login");
  }
  if (!password) throw new ApiError(400, "password is required");

  const user = await assertUserRoleAndPassword(supabase, {
    field: id.field,
    value: id.value,
    password,
    role: "employer",
  });

  const accessToken = generateAccessToken({ sub: user.id, role: "employer" });
  const refreshToken = generateRefreshToken({ sub: user.id, role: "employer" });
  const refreshTokenHash = sha256(refreshToken);

  let employer = null;

  if (user.email) {
    const { data, error: employerError } = await supabase
      .from("employers")
      .select(
        "id,fullname,email,phone,company_name,company_email,company_website,profile_photo,referrals_left,email_verified,phone_verified,is_active,is_suspended,created_at,updated_at"
      )
      .eq("email", user.email)
      .maybeSingle();

    if (employerError) throw new ApiError(500, employerError.message);
    employer = data;
  }

  if (!employer && user.phone) {
    const { data, error: employerError } = await supabase
      .from("employers")
      .select(
        "id,fullname,email,phone,company_name,company_email,company_website,profile_photo,referrals_left,email_verified,phone_verified,is_active,is_suspended,created_at,updated_at"
      )
      .eq("phone", user.phone)
      .maybeSingle();

    if (employerError) throw new ApiError(500, employerError.message);
    employer = data;
  }

  if (employer) {
    const { error: refreshStoreError } = await supabase
      .from("employers")
      .update({
        refresh_token_hash: refreshTokenHash,
        updated_at: new Date().toISOString(),
      })
      .eq("id", employer.id);

    if (refreshStoreError) throw new ApiError(500, refreshStoreError.message);
  }

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  const publicUser = {
    id: user.id,
    email: user.email,
    phone: user.phone,
    role: user.role,
    email_verified: user.email_verified,
    phone_verified: user.phone_verified,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: publicUser, employer, accessToken, refreshToken },
        "Employer logged in successfully"
      )
    );
});

export { registerEmployer, loginEmployer };
