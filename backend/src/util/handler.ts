import {
  DebatoApiError,
  ErrorAcknowledgment,
  GenericError,
  ValidationError,
} from "@debato/api";
import Joi from "joi";

export default function handler<F extends (...args: any) => any>(
  callback: F,
  validator: Joi.Schema[] | Joi.Schema = []
) {
  return (...args: Parameters<F>) => {
    try {
      if (!(validator instanceof Array)) validator = [validator];
      if (validator instanceof Array) {
        // Validate each argument
        for (let i = 0; i < validator.length; i++) {
          const { error } = validator[i].validate(args[i]);
          if (error) throw new ValidationError(error.message);
        }
      }
      callback(...args);
    } catch (error) {
      const debatoError =
        error instanceof DebatoApiError
          ? error
          : new GenericError(error.message);
      if (args.length > 0 && typeof args.at(-1) === "function") {
        const ack: ErrorAcknowledgment = args.at(-1);
        ack({
          error: debatoError.error,
          errorMessage: debatoError.message,
        });
      }
      console.error("Error handling function", callback.name, error);
    }
  };
}
