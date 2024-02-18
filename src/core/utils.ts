import { compare, genSalt, hash } from "bcryptjs";
import { generate } from "randomstring";
import { sign as JwtSign } from "jsonwebtoken";
import { TokenPayload } from "@/core/interfaces";

export async function generatePassword(password: string): Promise<string> {
  const salt = await genSalt(13);
  return hash(password, salt);
}

export function validatePassword(
  inputPassword: string,
  storedPassword: string,
): Promise<boolean> {
  return compare(inputPassword, storedPassword);
}

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function numericRandom(length: number): string {
  const result = generate({
    length,
    charset: "numeric",
  });
  return result;
}

export function generateRandom(length: number): string {
  const result = generate({
    length,
    charset: "alphanumeric",
  });
  return result;
}

export function generateToken(payload: TokenPayload): string {
  const accessToken: string = JwtSign(payload, "secret", {
    expiresIn: "1h",
  });
  return accessToken;
}
