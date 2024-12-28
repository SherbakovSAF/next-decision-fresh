import { MiddlewareConfig, NextResponse, NextRequest } from "next/server";

import { AuthTokenMiddleware } from "@/middlewares/auth-token.middleware";

export const middleware = async (request: NextRequest) => {
  let response = await AuthTokenMiddleware(request);

  if (!response) response = NextResponse.next();

  return response;
};

export const config: MiddlewareConfig = {
  matcher: ["/"],
};
