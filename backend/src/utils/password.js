import bcrypt from "bcrypt";

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

export async function hashPassword(plainPassword) {
  if (!plainPassword || typeof plainPassword !== "string") {
    throw new Error("Password must be a non-empty string");
  }
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

export async function comparePassword(plainPassword, passwordHash) {
  if (!plainPassword || typeof plainPassword !== "string") return false;
  if (!passwordHash || typeof passwordHash !== "string") return false;
  return bcrypt.compare(plainPassword, passwordHash);
}

