const mongoose = require("mongoose");

const transactionModelSchema = new  mongoose.Schema({
  userId: {type:String},
  productId:{type:String},
  type: { type: String, enum: ['credit', 'debit']},
  buyPrdouctUserId:{type:String,default:""},
  purchaseAmount: {type:Number},
},{versionKey:false,timestamps:true});

const transaction = mongoose.model("transaction", transactionModelSchema);
module.exports = transaction