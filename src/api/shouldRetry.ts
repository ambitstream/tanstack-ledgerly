import { ZodError } from "zod";
import { HttpError } from "./httpError";

const MAX_RETRIES = 3;

export function shouldRetry(failureCount: number, error: Error) {
  if (error instanceof ZodError) {
    return false;
  }

  if (error instanceof HttpError) {
    if (error.status >= 400 && error.status < 500) {
      return false;
    }
  }

  return failureCount < MAX_RETRIES;
}
