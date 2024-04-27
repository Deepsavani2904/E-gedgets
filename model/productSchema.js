const mongoose = require('mongoose');

const productSchema = new  mongoose.Schema({
  productId: { type: String, default:"P0" },
  productName: {type:String,require:true},
  productPrice:{type:Number,require:true},
  productType:{type:String,require:true},
  description:{type:String,default: null},
  productColor:{type:String},
  image: { type: String,default:null }
},{versionKey:false});


const product = mongoose.model("product", productSchema);

module.exports = product