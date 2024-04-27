const jwt = require('jsonwebtoken')


module.exports = (expactedRole) =>(req,res,next) =>{
    // console.log(req.body);
    const authorization = req.get('Authorization')
    // console.log("authorization",authorization);
    if(!authorization){
        return res.status(401).json({message:"Token Required"})
    }

    const token = authorization.split(" ")[1];
    let decoded;
    try {
        decoded = jwt.verify(token,process.env.SECRET_KEY);
    } catch (error) {
        return res.status(200).json({message:error.message})
    }
    // console.log(decoded,"decoded");
    if(!expactedRole.includes(decoded.role)){
        return res.status(401).json({messgae:"Unauthorized Token!"})
    }
    req.user = decoded.email
    
    next()
}