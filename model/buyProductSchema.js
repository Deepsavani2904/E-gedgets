const mongoose = require('mongoose');

const buyProductSchema = new  mongoose.Schema({
    productId: {type:String},
    userId:{type:String}
    // userId:{type: mongoose.Schema.Types.ObjectId,ref:"user"}
},{versionKey:false});

const buyProduct = mongoose.model("buyProduct", buyProductSchema);

module.exports = buyProduct