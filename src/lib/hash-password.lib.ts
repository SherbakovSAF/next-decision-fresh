import bcrypt from "bcrypt";

export const genPass = async (password: string): Promise<string> => {
  return bcrypt.hashSync(password, 10);
};

export const verifyPass = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return bcrypt.compareSync(password, hashPassword);
};
