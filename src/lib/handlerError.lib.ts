type ERROR_CONSTANTS = "NOT_FOUND" | "BAD_REQUEST";

type ResponseErrorHandler_T<T> = [
  { constError: ERROR_CONSTANTS; defaultError: T },
  { status: number }
];

// Функция формирует массив для деструктуризации в NextResponse
// Основная задача функции отобразить CONST ошибки, для центрального определения проблемы
export const handleError = <T>(
  constError: ERROR_CONSTANTS,
  defaultError: T
): ResponseErrorHandler_T<T> => {
  let status = 500;
  switch (constError) {
    case "BAD_REQUEST":
      status = 500;
      break;
    default:
      status = 404;
      break;
  }

  return [{ constError, defaultError }, { status }];
};
