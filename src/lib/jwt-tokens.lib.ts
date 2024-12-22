import { getUnixTime } from "date-fns";

import * as jose from "jose";

export const isValidToken = async (token: string) => {
  try {
    const resultToken = await verifyJWTToken(token);
    if (!resultToken?.exp) throw new Error("Ошибка");

    return resultToken.exp >= getUnixTime(new Date());
  } catch {
    throw new Error("Ошибка валидации");
  }
};

// Create and Read JWT Tokens
export const createJWTToken = async (
  payload: Record<string, unknown>,
  exp = "1h"
): Promise<string> => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error(
        "JWT_SECRET_KEY is not defined in environment variables."
      );
    }

    const secret = new TextEncoder().encode(secretKey);

    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(exp)
      .sign(secret);

    return token;
  } catch {
    throw new Error("Ошибка создания");
  }
};

export const verifyJWTToken = async (token: string) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables.");
  }

  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(secretKey)
    );
    return payload;
  } catch {
    throw new Error("Ошибка верификации");
  }
};
