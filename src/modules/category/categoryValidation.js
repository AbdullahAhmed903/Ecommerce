import joi from "joi";

export const createCategory = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string().min(2).max(40).required(),
    }),
  headers: joi
    .object()
    .required()
    .keys({
      authorization: joi.string().required(),
    })
    .options({ allowUnknown: true }),
};
