import { ZodError } from "zod";
import { HttpError } from "./httpError";

export function retryFunction(
  failureCount: number,
  error: ZodError | HttpError,
) {
  if (error instanceof ZodError) {
    return false;
  }

  if (error instanceof HttpError) {
    if (error.status >= 400 && error.status < 500) {
      return false;
    }
    return failureCount < 3;
  }

  return false;
}
