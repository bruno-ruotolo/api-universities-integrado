type ErrorTypes =
  | "conflict"
  | "not_found"
  | "unauthorized"
  | "unprocessable_entity"
  | "bad_request";

export interface AppError {
  type: ErrorTypes;
  message: string;
}

export function isAppError(error: Object): error is AppError {
  return (error as AppError).type !== undefined;
}

export function errorStatusCode(type: ErrorTypes) {
  const statusCodeMap = new Map([
    ["conflict", 409],
    ["not_found", 404],
    ["bad_request", 400],
  ]);

  if (statusCodeMap.has(type)) return statusCodeMap.get(type);

  return statusCodeMap.get("bad_request");
}

export function conflictError(message?: string) {
  return { type: "conflict", message };
}

export function notFoundError(message?: string) {
  return { type: "not_found", message };
}

export function badRequestError(message?: string) {
  return { type: "bad_request", message };
}
