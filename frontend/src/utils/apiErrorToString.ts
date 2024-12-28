import { ErrorState } from "@debato/api";

export default function apiErrorToString({
  error,
  errorMessage,
}: ErrorState): string {
  if (error) {
    return errorMessage;
  }
  return "";
}
