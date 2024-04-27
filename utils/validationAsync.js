const validate = require('./validation')
module.exports = (validateReq) =>async(req,res,next) =>{
    if(!validate[validateReq]){ 
     return res.status(401).json({status:false,message:"validation request not exist"})
    }

    try {
        const value = await validate[validateReq].validateAsync(req.body);
        req.body = value;
        next()
    } catch (error) {
        return res.status(401).json({message:error.message}) 
    }
}