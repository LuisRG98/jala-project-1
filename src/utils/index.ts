import { randomBytes } from "crypto";

const SIZE: number = parseInt(process.env.SECRETSIZE as string) || 64;

export const secrets: { [key: string]: string } = {};

export function generateSecretKey(): string {
  return randomBytes(SIZE).toString("hex");
}
