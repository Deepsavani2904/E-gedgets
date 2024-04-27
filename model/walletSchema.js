const mongoose = require("mongoose");

const walletModelSchema = new  mongoose.Schema({
  userId: {type:String,default:"A0"},
  amount: {type:Number ,default: 500}
},{versionKey:false,timeseries:true,timestamps:true});

const wallet = mongoose.model("wallet", walletModelSchema);
module.exports = wallet