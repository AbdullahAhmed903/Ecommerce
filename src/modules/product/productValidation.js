import joi from "joi";

export const createProduct = {
  body: joi
    .object()
    .required()
    .keys({
      name: joi.string().min(2).max(30).required(),
      price: joi.number().required(),
      description: joi.string().min(5),
      amount: joi.number().integer().required(),
      categoryId: joi.string().required(),
      brandId: joi.string().required(),
      colors: joi.alternatives(joi.string(), joi.array().items(joi.string())),
      size: joi.alternatives(joi.string(), joi.array().items(joi.string())),
    }),
};
