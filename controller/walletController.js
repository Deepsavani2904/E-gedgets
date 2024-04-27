const user = require("../model/userSchema");
const wallet = require("../model/walletSchema");

const getWalletData = async(req,res) =>{
    try {
       const userData = await user.findOne({email:req.user});
       const walletData = await wallet.aggregate([
        {
            $match :{userId: userData.userId}
        },
       ])
    //    const walletData = await wallet.find();
    //    let data = [];
    //    const walletObj = walletData.find((x) => x.userId == userData.userId);
    //    data.push(walletObj)
       if(!walletData){
        return res.status(200).json({status:true,data:[],message:'Data Get SuccessFully'})
       }

     return res.status(200).json({status:true,data:walletData,message:'Data Get SuccessFully'})
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getWalletData
}