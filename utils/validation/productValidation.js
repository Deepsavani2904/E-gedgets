const Joi = require("joi");

const productValidation = Joi.object({
  productName: Joi.string(),

  productPrice: Joi.number(),

  productType: Joi.string(),

  description: Joi.string(),

  productColor:Joi.string(),

  image:Joi.string(),
});

const buyProductSchema = Joi.object({
  productId: Joi.string(),
  userId: Joi.string()
});

module.exports = {productValidation,buyProductSchema};