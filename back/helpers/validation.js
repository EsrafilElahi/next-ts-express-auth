const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  passwordConfirm: Joi.string().required().valid(Joi.ref("password")),
  job: Joi.string(),
  birthDate: Joi.string(),
  age: Joi.string(),
  gender: Joi.string(),
  isAdmin: Joi.boolean(),
});


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const validateRegister = (data) => {
  const { error, value } = registerSchema.validate(data);
  return { error, value };
};

const validateLogin = (data) => {
  const { error, value } = loginSchema.validate(data);
  return error;
};

module.exports = { validateRegister, validateLogin };
