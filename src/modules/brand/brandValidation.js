import joi from "joi";

export const addBrand = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string().min(2).max(30).required(),
    }),
};

