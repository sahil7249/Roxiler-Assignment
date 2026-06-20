import { ApiError } from "../../utils/ApiError.js";

export const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(
    { body: req?.body },
    { abortEarly: false },
  );

  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    return next(new ApiError(400, message));
  }
  next();
};
