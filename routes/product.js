const express = require('express')
const { getData, getOneData, addData, updateData, deleteData } = require('../controller/productController')
const router = express.Router()
const authorise = require('../middleware/jwtAuth')
const validateReq = require('../utils/validationAsync')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/get',authorise(["admin","user"]),getData)
router.get('/get/:id',authorise(["admin"]),getOneData)
// router.post('/add',authorise(["admin"]),addData)
router.post('/add', validateReq('productValidation'),authorise(['admin']), upload.single('image'), addData);
router.patch('/update',validateReq('productValidation'),authorise(["admin"]),upload.single('image'),updateData)
router.delete('/delete/:id',authorise(["admin"]),deleteData)

module.exports = router