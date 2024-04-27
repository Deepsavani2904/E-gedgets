const express = require('express')
const { getUserData, getOneUserData, addUserData, deleteData, updateData } = require('../controller/userController')
const router = express.Router()
const validateReq = require('../utils/validationAsync')
const { getWalletData } = require('../controller/walletController')

router.get('/get',getUserData)
router.get('/get/:id',getOneUserData)
router.post('/add',validateReq('userSchema'),addUserData)
router.post('/update',validateReq('userSchema'),updateData)
router.delete('/delete/:id',deleteData)


module.exports = router