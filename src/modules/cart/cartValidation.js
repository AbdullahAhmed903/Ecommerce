import joi from "joi";

export const addCart = {
  body: joi
    .object()
    .required()
    .keys({
      products: joi.array().items({
        productId: joi.string().min(24).max(24).required(),
        quantity: joi.number().required(),
      }),
    }),
};
