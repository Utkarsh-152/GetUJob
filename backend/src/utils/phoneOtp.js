import { comparePassword } from "./password.js";

/**
 * Validates OTP against phone_otps, then marks the row used.
 * Expects otp_hash to be a bcrypt hash (same as password hashing).
 */
export async function verifyAndConsumePhoneOtp(supabase, phone, plainOtp) {
  if (!phone || !plainOtp) return { ok: false, reason: "missing_otp_or_phone" };

  const nowIso = new Date().toISOString();

  const { data: rows, error } = await supabase
    .from("phone_otps")
    .select("id, otp_hash, expires_at, is_used")
    .eq("phone", phone)
    .eq("is_used", false)
    .gt("expires_at", nowIso)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) return { ok: false, reason: error.message };
  const row = rows?.[0];
  if (!row) return { ok: false, reason: "invalid_or_expired_otp" };

  const match = await comparePassword(plainOtp, row.otp_hash);
  if (!match) return { ok: false, reason: "invalid_or_expired_otp" };

  const { error: updateError } = await supabase
    .from("phone_otps")
    .update({ is_used: true })
    .eq("id", row.id);

  if (updateError) return { ok: false, reason: updateError.message };
  return { ok: true };
}
