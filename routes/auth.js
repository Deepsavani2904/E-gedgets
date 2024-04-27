const express = require('express')
const { registerData, login, resetPassword, verfiyEmail, checkOtp, forgotPassword } = require('../controller/authController')
const router = express.Router()
const authorise = require('../middleware/jwtAuth')
const validateReq = require('../utils/validationAsync')

router.post('/register',validateReq('userSchema'),registerData)
router.post('/login',validateReq('loginSchema'),login)
router.post('/reset',authorise(["admin","user"]),validateReq('resetPasswordSchema'),resetPassword)
router.post('/verifyemail',validateReq('verifyemailSchema'),verfiyEmail)
router.post('/otp',authorise(["admin","user"]),validateReq('otpSchema'),checkOtp)
router.post('/forgot',validateReq('forgotPasswordSchema'),authorise(["admin","user"]),forgotPassword)

module.exports = router