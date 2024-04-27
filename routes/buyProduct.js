const express = require('express')
const { getBuyProduct, addBuyProduct, combineProduct, userBuyProduct } = require('../controller/buyProductController')
const router = express.Router()
const authorise = require('../middleware/jwtAuth')
const validateReq = require('../utils/validationAsync')
const { getWalletData } = require('../controller/walletController')
const { getUserTransaction } = require('../controller/transactionController')

router.get('/get',authorise(["admin"]),getBuyProduct)
router.post('/add',validateReq('buyProductSchema'),authorise(["admin","user"]),addBuyProduct)
router.get('/allget',validateReq('buyProductSchema'),authorise(["admin"]),combineProduct)
router.get('/userget',authorise(["user"]),userBuyProduct)
//Wallet
router.get('/wallte',authorise(["admin","user"]),getWalletData)
router.get('/transaction',authorise(["admin","user"]),getUserTransaction)

module.exports = router