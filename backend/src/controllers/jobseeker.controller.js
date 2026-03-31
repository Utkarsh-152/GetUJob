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

const registerJobSeeker = asyncHandler(async (req, res) => {
  const created = await registerUserInDb(supabase, req.body, "jobseeker");

  return res
    .status(201)
    .json(
      new ApiResponse(201, { user: created }, "Job seeker registered successfully")
    );
});

const loginJobSeeker = asyncHandler(async (req, res) => {
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
    role: "jobseeker",
  });

  const accessToken = generateAccessToken({ sub: user.id, role: "jobseeker" });
  const refreshToken = generateRefreshToken({ sub: user.id, role: "jobseeker" });

  const { data: jobseeker, error: jobseekerError } = await supabase
    .from("jobseekers")
    .select(
      "id,user_id,fullname,profile_photo,email_verified,phone_verified,resume,referrals_matched,created_at,updated_at"
    )
    .eq("user_id", user.id)
    .maybeSingle();

  if (jobseekerError) throw new ApiError(500, jobseekerError.message);

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
        { user: publicUser, jobseeker, accessToken, refreshToken },
        "Job seeker logged in successfully"
      )
    );
});

export { registerJobSeeker, loginJobSeeker };
