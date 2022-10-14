const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  passwordConfirm: Joi.string().required().valid(Joi.ref("password")),
  job: Joi.string(),
  birthDate: Joi.date(),
  age: Joi.number(),
  gender: Joi.string(),
  isAdmin: Joi.boolean(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const validateRegister = (data) => {
  const { error, value } = registerSchema.validate(data);
  return error;
};

const validateLogin = (data) => {
  const { error, value } = loginSchema.validate(data);
  return error;
};

module.exports = { validateRegister, validateLogin };
