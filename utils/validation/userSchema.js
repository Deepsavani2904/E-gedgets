const Joi = require("joi");

const userSchema = Joi.object({
  _id: Joi.string().allow().optional(),
  userId: Joi.string().allow().optional(),
  userName: Joi.string().alphanum().min(3).max(10).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  confirmPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  mobileNo: Joi.string().pattern(
    new RegExp(/^[+]?[\d\s()-]+$/)
).message('Invalid phone number format').required(),

  otp: Joi.number().min(4).max(6).allow(0).optional(),

  role: Joi.string(),
  referralCode :Joi.string().allow('').optional(),
  referPerson: Joi.string().allow('').optional(),
});

const loginSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const resetPasswordSchema = Joi.object({
  newPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  confirmPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  otp: Joi.number(),
});

const verifyemailSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const otpSchema = Joi.object({
  otp: Joi.number(),
});


const forgotPasswordSchema = Joi.object({
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  
    confirmPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
module.exports = {
  userSchema,
  loginSchema,
  resetPasswordSchema,
  verifyemailSchema,
  otpSchema,
  forgotPasswordSchema
};

// const Joi = require("joi");

// const productValidation = Joi.object({
//   productName: Joi.string().alphanum().required(),

//   productPrice: Joi.number().required(),

//   productType: Joi.string().required(),

//   description: Joi.string(),

//   productColor:Joi.string(),

//   image:Joi.string(),
// });

// module.exports = productValidation;
