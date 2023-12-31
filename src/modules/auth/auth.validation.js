import joi from "joi";

export const signup = {
  body: joi
    .object()
    .required()
    .keys({
      userName: joi.string().min(2).max(20).required(),
      email: joi.string().email().required(),
      password: joi
        .string()
        .pattern(
          new RegExp(
            /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
          )
        )
        .required(),
      confirmPassword: joi.string().valid(joi.ref("password")).required(),
      phone: joi.string().required(),
    }),
};

export const confirmemail = {
  params: joi.object().required().keys({
    token: joi.string().required(),
  }),
};

export const login = {
  body: joi
    .object()
    .required()
    .keys({
      email: joi.string().email().required(),
      password: joi
        .string()
        .pattern(
          new RegExp(
            /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
          )
        )
        .required(),
    }),
};
