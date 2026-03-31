import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "30d";

export function generateAccessToken(payload) {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error("Missing JWT_ACCESS_SECRET");
  return jwt.sign(payload, secret, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

export function generateRefreshToken(payload) {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("Missing JWT_REFRESH_SECRET");
  return jwt.sign(payload, secret, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

export function verifyAccessToken(token) {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error("Missing JWT_ACCESS_SECRET");
  return jwt.verify(token, secret);
}

export function verifyRefreshToken(token) {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("Missing JWT_REFRESH_SECRET");
  return jwt.verify(token, secret);
}
