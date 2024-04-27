const mongoose = require("mongoose");

const UserModelSchema = new  mongoose.Schema({
  userId: {type:String,default:"A0"},
  userName: {type:String,require:true},
  email: {type:String},
  password:{type:String},
  mobileNo:{type: String},
  otp: {type:Number ,default:0},
  role:{type:String,default:"user"},
  referralCode:{type:String},
  referPerson:{type:String,default:""}
},{versionKey:false,timeseries:true,timestamps:true});

const user = mongoose.model("user", UserModelSchema);
module.exports = user