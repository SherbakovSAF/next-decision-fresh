import { MiddlewareConfig, NextResponse, NextRequest } from "next/server";

import { AuthTokenMiddleware } from "@/middlewares/auth-token.middleware";

export const middleware = async (request: NextRequest) => {
  // TODO: Если пользователь авторизирован и идёт на auth, то его не пускать
  let response = await AuthTokenMiddleware(request);

  if (!response) response = NextResponse.next();

  return response;
};

export const config: MiddlewareConfig = {
  matcher: ["/"],
};
