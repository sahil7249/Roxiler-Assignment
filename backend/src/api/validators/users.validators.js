import joi from "joi";

export const createUserSchema = joi.object({
  body: joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    address: joi.string().required().max(400),
    password: joi
      .string()
      .required()
      .min(8)
      .max(16)
      .pattern(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/)
      .message(
        "Password must be between 8 to 16 characters and must contain one uppercase and one special character",
      ),
    role: joi.string().required(),
  }),
});

export const updateUserSchema = joi.object({
  body: joi.object({
    newPassword: joi
      .string()
      .required()
      .min(8)
      .max(16)
      .pattern(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/)
      .message(
        "Password must be between 8 to 16 characters and must contain one uppercase and one special character",
      ),
      oldPassword : joi.string().required()
  }),
});
