export type ErrorConstants_T =
  | "NOT_FOUND"
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "OK"
  | "CREATED";

export class HandleError<T = unknown> {
  private constError: ErrorConstants_T;
  private defaultError?: T;
  private status: number;

  private statusMap(constError: ErrorConstants_T): number {
    switch (constError) {
      case "OK":
        return 200;
      case "CREATED":
        return 201;
      case "UNAUTHORIZED":
        return 401;
      case "FORBIDDEN":
        return 403;
      case "NOT_FOUND":
        return 404;

      default:
        return 500;
    }
  }

  constructor(constError: ErrorConstants_T, defaultError?: T) {
    this.constError = constError;
    this.defaultError = defaultError;
    this.status = this.statusMap(constError);
  }

  private getObject() {
    return {
      constError: this.constError,
      defaultError: this.defaultError,
      status: this.status,
    };
  }

  private getArrayForResponse() {
    return [
      { constError: this.constError, defaultError: this.defaultError },
      { status: this.status },
    ];
  }

  public static const(constError: ErrorConstants_T) {
    return constError;
  }

  public static object(constError: ErrorConstants_T) {
    return new HandleError(constError).getObject();
  }

  public static nextResponse<T = unknown>(
    constError: ErrorConstants_T,
    defaultError?: T
  ) {
    return new HandleError(constError, defaultError).getArrayForResponse();
  }
}
