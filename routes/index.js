const express = require('express')
const router = express.Router()
const auth = require('./auth')
const user = require('./user')
const product = require('./product')
const buyProduct = require('./buyProduct')
const authorise = require('../middleware/jwtAuth')

router.use('/auth',auth)
router.use('/user',authorise(["admin"]),user)
router.use('/product',product)
router.use('/buyProduct',buyProduct)

module.exports = router