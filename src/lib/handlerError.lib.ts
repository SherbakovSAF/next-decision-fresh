type ERROR_CONSTANTS = "NOT_FOUND" | "BAD_REQUEST";

type ResponseErrorHandler_T<T> = {
  constError: ERROR_CONSTANTS;
  defaultError: T;
  status: number;
};

export const handleError = <T>(
  constError: ERROR_CONSTANTS,
  defaultError: T
): ResponseErrorHandler_T<T> => {
  console.error(`Error: ${defaultError}. Const: ${constError}`);

  switch (constError) {
    case "NOT_FOUND":
      return { constError, defaultError, status: 404 };
    case "BAD_REQUEST":
      return { constError, defaultError, status: 500 };

    default:
      return { constError, defaultError, status: 404 };
  }
};
