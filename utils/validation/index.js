const {userSchema,loginSchema,resetPasswordSchema,verifyemailSchema,otpSchema,forgotPasswordSchema} = require('./userSchema')
const {productValidation,buyProductSchema} = require('./productValidation')


module.exports = {
    userSchema,
    loginSchema,
    resetPasswordSchema,
    verifyemailSchema,
    otpSchema,
    forgotPasswordSchema,
    productValidation,
    buyProductSchema
}