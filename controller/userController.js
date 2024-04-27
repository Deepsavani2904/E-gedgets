const { Types } = require("mongoose");
const user = require("../model/userSchema");
const bcrypt = require("bcrypt");
const wallet = require("../model/walletSchema");

const getUserData = async (req, res) => {
    try {
        const data = await user.find();
        return res.status(200).json({ status: true, data: data, message: "Data Get SuccessFully" });
    } catch (error) {
        console.log(error);
    }
};

const getOneUserData = async (req, res) => {
    try {
        const data = await user.findOne({ _id: req.params.id });
        return res.status(200).json({ status: true, data: data, message: "Data Get SuccessFully" });
    } catch (error) {
        console.log(error);
    }
};

const addUserData = async (req, res) => {
  try {
    const Alldata = await user.find();
    let referral = await referralCodeFunction();

    const isReferralCodeExists = Alldata.some((data) => data.referralCode === referral);
     if(isReferralCodeExists){
      referral = await referralCodeFunction();
     }
 
     const data = await user.findOne({referralCode:req.body.referralCode});
     

    // const newId = Alldata.length === 0 ? 1:Number(Alldata[Alldata.length-1].userId.split("A")[1])+1
    const newId = Alldata.length > 0 ? Number(Alldata[Alldata.length - 1].userId.slice(1)) + 1 : 1;

    const existingData = await user.findOne({ email: req.body.email });
    if (existingData) {
      return res.status(200).json({ status: false, data: [], message: "User Already Exist" });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const check = await bcrypt.compare(req.body.confirmPassword, password);
    if (!check) {
      return res.status(200).json({status: false,data: [],message: "password and confirmPassword not match",});
    }
    const walletData = await wallet.create({userId:`A${newId}`});

    const newData = await user.create({...req.body,userId: `A${newId}`,password: password,referralCode: referral,referPerson: data ? data.userId : ""});
    return res.status(200).json({ status: true, data: newData, message: "Data add SuccessFully" });
    // return res.status(200).json({ status: true, data: newData, message: "Data add SuccessFully" });
    } catch (error) {
        console.log(error);
    }
};

const updateData = async (req, res) => {
    try {
        const data = await user.findByIdAndUpdate({ _id: new Types.ObjectId(req.query.id) },{ $set: req.body });
        return res.status(200).json({ status: true, data: data, message: "Data update SuccessFully" });
    } catch (error) {
        console.log(error);
    }
};

const deleteData = async (req, res) => {
    try {
        const data = await user.deleteOne({ _id: req.params.id });
        return res.status(200).json({ status: true, data: data, message: "Data delete SuccessFully" });
    } catch (error) {
        console.log(error);
    }
};

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

    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
    // const charactersArray = characters.split("");

    // let referralCode = "";

    // for (let i = 1; i <= 6; i++) {
    //   const referral = characters[Math.trunc(Math.random() * characters.length)];
    //   referralCode += referral;
    // }

  return referralCode
};

module.exports = {
  getUserData,
  getOneUserData,
  addUserData,
  updateData,
  deleteData,
};



// const referralCodeFunction = (userData) => {
//   // console.log("call");
//   // const userData =  user.find();
//   // console.log(userData,"userData");
// const upperAtoZ = Array.from({ length: 26 }, (_, index) => String.fromCharCode("A".charCodeAt(0) + index));
// const LowerAtoZ = Array.from({ length: 26 }, (_, index) =>String.fromCharCode("a".charCodeAt(0) + index));
// const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// const mainArray = [...upperAtoZ, ...LowerAtoZ, ...number];
// let referralCode = "";
// let codeExists;
// // do {
// //   referralCode = "";
//   for (let i = 1; i <= 6; i++) {
//     const referral = mainArray[Math.trunc(Math.random() * mainArray.length)];
//     referralCode += referral;
//   }

// //    codeExists = userData.some((item) => item.referralCode === referralCode);
// //   console.log(codeExists,"codeExists");
// // } while (codeExists);
// //   console.log(referralCode,"referralCode");

// return referralCode
// };