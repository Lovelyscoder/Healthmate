import bcrypt from "bcryptjs";
import { promises } from "dns";
import { PassThrough } from "stream";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  Password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(Password, hash);
};
