const user = require("../model/userSchema");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const wallet = require("../model/walletSchema");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kishanpatel369511@gmail.com',
      pass: 'tkog moos yhxw aaxy'
    }
 });
const registerData = async (req,res) =>{
    try {
        const Alldata = await user.find();
        let referral = await referralCodeFunction();
    
        const isReferralCodeExists = Alldata.some((data) => data.referralCode === referral);
         if(isReferralCodeExists){
          referral = await referralCodeFunction();
         }
        const existingData = await user.findOne({email:req.body.email});
        
        const checkAdmin = await user.findOne({role:req.body.role});        
        if(checkAdmin){
           return res.status(200).json({status:false,message:"Admin Already Exist"}) 
        }
        else{
            if(existingData){
                return res.status(200).json({status:false,data:[],message:"User Already Exist"})
            }
    
            if(req.body.role != 'admin'){
                return res.status(200).json({ status: false, message: "Only admin can registration" });
            }
    
            const password = await bcrypt.hash(req.body.password, 10)
            const check = await bcrypt.compare(req.body.confirmPassword, password)
            if(!check){
                return res.status(200).json({status:false,message:"Password and ConfirmPassword Does not Match"})
            }
            await wallet.create({userId:"A0"});
            const data = await user.create({...req.body,password:password,referralCode:referral,userId:"A0"});
            return res.status(200).json({status:true,data:data,message:"Registration SuccessFully"})
        }

    } catch (error) {
        console.log(error);     
    }
}

const login = async(req,res) =>{
    try {
        const checkData = await user.findOne({email:req.body.email})
        if(!checkData){
            return res.status(200).json({status:false,message:"User Not Found"})  
        }

        const check = await bcrypt.compare(req.body.password, checkData.password)
        if(!check){
            return res.status(200).json({status:false,message:"Password is incorrect"})   
        }
        const token =  jwt.sign({
            email: checkData.email,
            role:   checkData.role
          }, process.env.SECRET_KEY, { expiresIn: '12h' });
        return res.status(200).json({status:true,data:checkData,token:token,message:"Login SuccessFully"})
    } catch (error) {
      console.log(error);     
    }
}

const resetPassword = async(req,res) =>{
    try {

        const checkData = await user.findOne({email:req.user})
        if(checkData.otp != req.body.otp){
            return res.status(200).json({status:false,message:"Invalid Otp"})
        }

        const password = await bcrypt.hash(req.body.newPassword, 10)
        const check = await bcrypt.compare(req.body.confirmPassword, password)
        
        if(!check){
            return res.status(200).json({status:false,message:"Password and ConfirmPassword Does not Match"})
        }

        const data = await user.updateOne({email: req.user},{$set:{password:password}})
        return res.status(200).json({status:true,data:data,message:"Password Reset SuccessFully"})
    } catch (error) {
        console.log(error);
        
    }
}

const verfiyEmail = async(req,res) =>{
    try {
      const checkData = await user.findOne({email:req.body.email});
         if(!checkData){
            return res.status(200).json({status:false,message:"Email Not Found"}) 
         }

         const otp = Math.trunc(Math.random()*1000000)
         const  mailOptions = {
            from: 'kishanpatel369511@gmail.com',
            to: 'kishanpatel369511@gmail.com',
            subject: 'Sending Email using Node.js',
            text: `your Otp :${otp}`
          };

          const token =  jwt.sign({
            email: checkData.email,
            role:   checkData.role
          }, process.env.SECRET_KEY, { expiresIn: '2m' });

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
         
         const data = await user.updateOne({email:req.body.email},{$set:{otp:otp}},{new:true})
         return res.status(200).json({status:true,data:data,token:token,message:"Otp send SuccessFully"})
    } catch (error) {
        console.log(error);
        
    }
}

const checkOtp = async(req,res) =>{
    try {
       const checkData = await user.findOne({email:req.user,otp:req.body.otp});
       if(!checkData){
        return res.status(200).json({status:false,data: [],message:"Otp not Valid"}) 
       }

       return res.status(200).json({status:true,data: [],message:"Otp verify SuccessFully"})  
    } catch (error) {
        console.log(error);
        
    }
}

const forgotPassword = async(req,res) =>{
    try {
        const password = await bcrypt.hash(req.body.password, 10)
        const check = await bcrypt.compare(req.body.confirmPassword, password)
       if(!check){
        return res.status(200).json({status:false,message:"Password and ConfirmPassword Does not Match"})
       }

       const data = await user.updateOne({email:req.user},{$set:{password:password}})
       return res.status(200).json({status:true,data:data,message:"Password Change SuccessFully"})
    } catch (error) {
        console.log(error);
    }
}



//referralCode Genrate Function
const referralCodeFunction = () => {
    const upperAtoZ = Array.from({ length: 26 }, (_, index) => String.fromCharCode("A".charCodeAt(0) + index));
    const LowerAtoZ = Array.from({ length: 26 }, (_, index) =>String.fromCharCode("a".charCodeAt(0) + index));
    const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  
    const mainArray = [...upperAtoZ, ...LowerAtoZ, ...number];
    let referralCode = "";
  
      for (let i = 1; i <= 6; i++) {
        const referral = mainArray[Math.trunc(Math.random() * mainArray.length)];
        referralCode += referral;
      }
    return referralCode
  };
module.exports = {
    registerData,
    login,
    resetPassword,
    verfiyEmail,
    checkOtp,
    forgotPassword
}