import { NextFunction, Response, Request } from "express";
import { AppError, errorStatusCode, isAppError } from "../utils/errorUtils.js";

export function handleErrors(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`Something Went Wrong: `, error);

  if (isAppError(error)) {
    const statusCode = errorStatusCode(error.type);
    return res.status(statusCode).send(error.message);
  }

  res.status(500).send(error);
}
