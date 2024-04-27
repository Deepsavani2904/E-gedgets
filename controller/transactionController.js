const buyProduct = require("../model/buyProductSchema");
const transaction = require("../model/transactionSchema");
const user = require("../model/userSchema");

// const getUserTransaction = async (req,res) =>{
//     try {
//         const userData = await user.findOne({email:req.user})
//         if (!userData) {
//             return res.status(200).json({ status: false, message: "User not found" });
//           }

     

      
//           const checkType = await transaction.find({ userId: userData.userId });
//           console.log(checkType,"checkType");
      
//           // Check if checkType is not found
//           if (!checkType) {
//             return res.status(200).json({ status: false, message: "Transaction type not found" });
//           }
//           let creditTransactions = [];
//           let debitTransactions = [];
//         // console.log(checkType,"type");
//         if(checkType[0].type == "credit"){
//             creditTransactions = await transaction.aggregate([
//                 {
//                   $match: { userId: userData.userId }
//                 },
//                 {
//                     $lookup: {
//                       from: "products",
//                       localField: "productId",
//                       foreignField: "productId",
//                       as: "product_details",
//                     },
//                 },
//                 {
//                     $lookup: {
//                       from: "buyproducts",
//                       localField: "productId",
//                       foreignField: "productId",
//                       as: "Buyproduct_details",
//                     },
//                 },
//                 {
//                     $unwind:{path:"$product_details"}
//                 },
//                 {
//                     $unwind:{path:"$Buyproduct_details"}
//                 },
//                 {
//                     $lookup: {
//                         from: "users",
//                         localField: "Buyproduct_details.userId",
//                         foreignField: "userId",
//                         as: "user_details",
//                       }, 
//                 },
//                 {
//                     $unwind:{path:"$user_details"}
//                 },
//                 {
//                     $addFields: {
//                         userId: "$Buyproduct_details.userId",
//                         userName: "$user_details.userName",
//                         productPrice:"$product_details.productPrice"
//                     }
//                 },
//                 {
//                     $project:{
//                         product_details:0,
//                         Buyproduct_details:0,
//                         user_details:0,
//                         createdAt:0
//                     }
//                 }
//             ]);
//         }
       
//         console.log(creditTransactions,"creditTransactions");
//         if(checkType[1].type == "debit"){
//             debitTransactions = await transaction.aggregate([
//                 {
//                   $match: { userId: userData.userId }
//                 },
//                 {
//                     $lookup: {
//                       from: "products",
//                       localField: "productId",
//                       foreignField: "productId",
//                       as: "product_details",
//                     },
//                 },
//                 {
//                     $unwind:{path:"$product_details"}
//                 },
//                 {
//                     $addFields:{
//                         productName:"$product_details.productName",
//                         productType:"$product_details.productType",
//                         productColor:"$product_details.productColor",
//                         image :"$product_details.image",
//                     }
//                 },
//                 {
//                     $project:{
//                         product_details: 0,
//                     }
//                 },
//             ]);
//         }

//         // console.log(debitTransactions,"debitTransactions");

//       return res.status(200).json({status:true,data:[],message:"Transaction History Get SuccessFully"}) 
//     } catch (error) {
//         console.log(error);
//     }
// }
// const getUserTransaction = async (req, res) => {
//     try {
//         const userData = await user.findOne({ email: req.user });
//         if (!userData) {
//             return res.status(200).json({ status: false, message: "User not found" });
//         }

//         const transactions = await transaction.aggregate([
//             { $match: { userId: userData.userId } },
//             {
//                 $group: {
//                     _id: "$type",
//                     transactions: { $push: "$$ROOT" }
//                 }
//             }
//         ]);

//         if (!transactions || transactions.length === 0) {
//             return res.status(200).json({ status: false, message: "Transaction type not found" });
//         }

//         let creditTransactions = transactions.find(group => group._id === "credit");
//         let debitTransactions = transactions.find(group => group._id === "debit");

//         if (creditTransactions) {
//             creditTransactions = await transaction.aggregate([
//                 {
//                     $match: { userId: userData.userId, type: "credit" }
//                 },
//                 {
//                     $lookup: {
//                         from: "products",
//                         localField: "productId",
//                         foreignField: "productId",
//                         as: "product_details",
//                     },
//                 },
//                 {
//                     $lookup: {
//                         from: "buyproducts",
//                         localField: "productId",
//                         foreignField: "productId",
//                         as: "Buyproduct_details",
//                     },
//                 },
//                 {
//                     $unwind: { path: "$product_details" }
//                 },
//                 {
//                     $unwind: { path: "$Buyproduct_details" }
//                 },
//                 {
//                     $lookup: {
//                         from: "users",
//                         localField: "Buyproduct_details.userId",
//                         foreignField: "userId",
//                         as: "user_details",
//                     },
//                 },
//                 {
//                     $unwind: { path: "$user_details" }
//                 },
//                 {
//                     $addFields: {
//                         userId: "$Buyproduct_details.userId",
//                         userName: "$user_details.userName",
//                         productPrice: "$product_details.productPrice"
//                     }
//                 },
//                 {
//                     $project: {
//                         product_details: 0,
//                         Buyproduct_details: 0,
//                         user_details: 0,
//                         createdAt: 0
//                     }
//                 }
//             ]);
//         }

//         if (debitTransactions) {
//             debitTransactions = await transaction.aggregate([
//                 {
//                     $match: { userId: userData.userId, type: "debit" }
//                 },
//                 {
//                     $lookup: {
//                         from: "products",
//                         localField: "productId",
//                         foreignField: "productId",
//                         as: "product_details",
//                     },
//                 },
//                 {
//                     $unwind: { path: "$product_details" }
//                 },
//                 {
//                     $addFields: {
//                         productName: "$product_details.productName",
//                         productType: "$product_details.productType",
//                         productColor: "$product_details.productColor",
//                         image: "$product_details.image",
//                     }
//                 },
//                 {
//                     $project: {
//                         product_details: 0,
//                     }
//                 },
//             ]);
//         }

//         // Now you have separate arrays for credit and debit transactions
//         console.log(creditTransactions, "creditTransactions");
//         console.log(debitTransactions, "debitTransactions");

//         return res.status(200).json({ status: true, data: [], message: "Transaction History Get SuccessFully" });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: false, message: "Internal server error" });
//     }
// };

// const getUserTransaction = async (req, res) => {
//     try {
//         const userData = await user.findOne({ email: req.user });
//         if (!userData) {
//             return res.status(200).json({ status: false, message: "User not found" });
//         }

//         const transactions = await transaction.aggregate([
//             { $match: { userId: userData.userId } },
//             {
//                 $group: {
//                     _id: "$type",
//                     transactions: { $push: "$$ROOT" }
//                 }
//             }
//         ]);

//         if (!transactions || transactions.length === 0) {
//             return res.status(200).json({ status: false, message: "Transaction type not found" });
//         }

//         let creditTransactions = [];
//         let debitTransactions = [];

//         if (transactions.some(group => group._id === "credit")) {
//             creditTransactions = await transaction.aggregate([
//                 {
//                     $match: { userId: userData.userId, type: "credit" }
//                 },
//                 {
//                     $lookup: {
//                         from: "products",
//                         localField: "productId",
//                         foreignField: "productId",
//                         as: "product_details",
//                     },
//                 },
//                 {
//                     $lookup: {
//                         from: "buyproducts",
//                         localField: "productId",
//                         foreignField: "productId",
//                         as: "Buyproduct_details",
//                     },
//                 },
//                 {
//                     $unwind: { path: "$product_details" }
//                 },
//                 {
//                     $unwind: { path: "$Buyproduct_details" }
//                 },
//                 {
//                     $lookup: {
//                         from: "users",
//                         localField: "Buyproduct_details.userId",
//                         foreignField: "userId",
//                         as: "user_details",
//                     },
//                 },
//                 {
//                     $unwind: { path: "$user_details" }
//                 },
//                 {
//                     $addFields: {
//                         userId: "$Buyproduct_details.userId",
//                         userName: "$user_details.userName",
//                         productPrice: "$product_details.productPrice"
//                     }
//                 },
//                 {
//                     $project: {
//                         product_details: 0,
//                         Buyproduct_details: 0,
//                         user_details: 0,
//                         createdAt: 0
//                     }
//                 }
//             ]);
//         }

//         if (transactions.some(group => group._id === "debit")) {
//             debitTransactions = await transaction.aggregate([
//                 {
//                     $match: { userId: userData.userId, type: "debit" }
//                 },
//                 {
//                     $lookup: {
//                         from: "products",
//                         localField: "productId",
//                         foreignField: "productId",
//                         as: "product_details",
//                     },
//                 },
//                 {
//                     $unwind: { path: "$product_details" }
//                 },
//                 {
//                     $addFields: {
//                         productName: "$product_details.productName",
//                         productType: "$product_details.productType",
//                         productColor: "$product_details.productColor",
//                         image: "$product_details.image",
//                     }
//                 },
//                 {
//                     $project: {
//                         product_details: 0,
//                     }
//                 },
//             ]);
//         }

//         console.log(creditTransactions, "creditTransactions");
//         console.log(debitTransactions, "debitTransactions");

//         return res.status(200).json({ status: true, data: { creditTransactions, debitTransactions }, message: "Transaction History Get SuccessFully" });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: false, message: "Internal server error" });
//     }
// };



// const getUserTransaction = async (req, res) => {
//     try {
//         const userData = await user.findOne({ email: req.user });
//         if (!userData) {
//             return res.status(200).json({ status: false, message: "User not found" });
//         }

//         const transactions = await transaction.aggregate([
//             { $match: { userId: userData.userId } },
//             {
//                 $group: {
//                     _id: "$type",
//                     transactions: { $push: "$$ROOT" }
//                 }
//             }
//         ]);

//         if (!transactions || transactions.length === 0) {
//             return res.status(200).json({ status: false, message: "Transaction type not found" });
//         }

//         let creditTransactions = [];
//         let debitTransactions = [];

//         if (transactions.some(group => group._id === "credit")) {
//             creditTransactions = await transaction.aggregate([
//                 {
//                     $match: { userId: userData.userId, type: "credit" }
//                 },
//                 {
//                     $lookup: {
//                         from: "products",
//                         localField: "productId",
//                         foreignField: "productId",
//                         as: "product_details",
//                     },
//                 },
//                 {
//                     $lookup: {
//                         from: "buyproducts",
//                         localField: "productId",
//                         foreignField: "productId",
//                         as: "Buyproduct_details",
//                     },
//                 },
//                 {
//                     $unwind: { path: "$product_details" }
//                 },
//                 {
//                     $unwind: { path: "$Buyproduct_details" }
//                 },
//                 {
//                     $lookup: {
//                         from: "users",
//                         localField: "Buyproduct_details.userId",
//                         foreignField: "userId",
//                         as: "user_details",
//                     },
//                 },
//                 {
//                     $unwind: { path: "$user_details" }
//                 },
//                 {
//                     $addFields: {
//                         userId: "$Buyproduct_details.userId",
//                         userName: "$user_details.userName",
//                         productPrice: "$product_details.productPrice"
//                     }
//                 },
//                 {
//                     $project: {
//                         product_details: 0,
//                         Buyproduct_details: 0,
//                         user_details: 0,
//                         createdAt: 0
//                     }
//                 }
//             ]);
//         }

//         if (transactions.some(group => group._id === "debit")) {
//             debitTransactions = await transaction.aggregate([
//                 {
//                     $match: { userId: userData.userId, type: "debit" }
//                 },
//                 {
//                     $lookup: {
//                         from: "products",
//                         localField: "productId",
//                         foreignField: "productId",
//                         as: "product_details",
//                     },
//                 },
//                 {
//                     $unwind: { path: "$product_details" }
//                 },
//                 {
//                     $addFields: {
//                         productName: "$product_details.productName",
//                         productType: "$product_details.productType",
//                         productColor: "$product_details.productColor",
//                         image: "$product_details.image",
//                     }
//                 },
//                 {
//                     $project: {
//                         product_details: 0,
//                     }
//                 },
//             ]);
//         }

//         console.log(creditTransactions, "creditTransactions");
//         console.log(debitTransactions, "debitTransactions");

//         return res.status(200).json({ status: true, data: { creditTransactions, debitTransactions }, message: "Transaction History Get SuccessFully" });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: false, message: "Internal server error" });
//     }
// };

// console.log('done');

// const getUserTransaction = async (req, res) => {
//     try {
//         const userData = await user.findOne({ email: req.user });
//         // console.log(userData,"userData");
//         // if()
//         const referPerson = await user.findOne({userId:userData.referPerson});
    
//         // console.log(referPerson,"referPerson");
//         if (!userData) {
//             return res.status(404).json({ status: false, message: "User not found" });
//         }

//         // const product = await buyProduct.aggregate([

//         // ])

//         const transactions = await transaction.aggregate([
//             { $match: { userId: userData.userId } },
//             {
//                 $lookup: {
//                     from: "products",
//                     localField: "productId",
//                     foreignField: "productId",
//                     as: "product_details",
//                 },
//             },
//             {
//                 $lookup: {
//                     from: "users",
//                     let: { userId: "$userId", referPersonId: "$referPersonId", type: "$type" },
//                     pipeline: [
//                         {
//                             $match: {
//                                 $expr: {
//                                     $or: [
//                                         { $eq: ["$$type", "credit"] },
//                                         { $and: [{ $eq: ["$$type", "debit"] }, { $eq: ["$$userId", "$userId"] }] },
//                                     ]
//                                 }
//                             }
//                         },
//                         {
//                             $project: {
//                                 userId: 1,
//                                 userName: 1,
//                             }
//                         }
//                     ],
//                     as: "buyProduct_details",
//                 },
//             },            
//             {
//                 $unwind: { path: "$product_details" }
//             },
//             {
//                 $unwind: { path: "$buyProduct_details" }
//             },
//             {
//                 $group: {
//                     _id: "$type",
//                     transactions: { $push: "$$ROOT" }
//                 }
//             },
//         ]);
//         console.log(transactions,"transactions");

//         if (!transactions || transactions.length === 0) {
//             return res.status(200).json({ status: false, message: "Transaction type not found" });
//         }

//         let creditTransactions = [];
//         let debitTransactions = [];

//         transactions.forEach(group => {
//             if (group._id === "credit") {
//                 creditTransactions = group.transactions.map(transaction => {
//                     const { userId, userName } = transaction.buyProduct_details || {};
//                     console.log(userId,"uiD");
//                     const { productPrice } = transaction.product_details || {};
//                     return {
//                         userId,
//                         userName,
//                         productPrice,
//                         type: transaction.type,
//                         updatedAt:transaction.updatedAt,
//                         purchaseAmount: transaction.purchaseAmount
//                     };
//                 });
//             } else if (group._id === "debit") {
//                 debitTransactions = group.transactions.map(transaction => {
//                     const { productName, productType, productColor, image } = transaction.product_details || {};
//                     return {
//                         productName,
//                         productType,
//                         productColor,
//                         image,
//                         type: transaction.type,
//                         updatedAt:transaction.updatedAt,
//                         purchaseAmount: transaction.purchaseAmount
//                     };
//                 });
//             }
//         });

//         return res.status(200).json({ status: true, data: { creditTransactions, debitTransactions }, message: "Transaction History Get SuccessFully" });
//         // return res.status(200).json({ status: true, data:transactions, message: "Transaction History Get SuccessFully" });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ status: false, message: "Internal server error" });
//     }
// };

const getUserTransaction = async (req, res) => {
    try {
        const userData = await user.findOne({ email: req.user });
        console.log(userData,"userData");
        if(userData.role == 'admin'){
            //Debit All Transaction
            const debitTransactionData = await transaction.aggregate([
                {
                   $match:{type:"debit"}
                },
                {
                   $lookup: {
                       from: "products",
                       localField: "productId",
                       foreignField: "productId",
                       as: "product_details",
                    },
                },
                {
                   $unwind:{path:"$product_details"}
                },
                {
                   $addFields:{
                       productName:"$product_details.productName",
                       productType:"$product_details.productType",
                       productColor:"$product_details.productColor",
                       image:"$product_details.image"
                   }
                },
                {
                   $project:{
                       product_details:0 ,
                       createdAt:0,
                       buyPrdouctUserId:0
                   }
                }
               ])
              
               //Credit All Transaction
               const creditTransactionData = await transaction.aggregate([
                   {
                      $match:{type:"credit"}
                   },
                   {
                       $lookup: {
                           from: "users",
                           localField: "buyPrdouctUserId",
                           foreignField: "userId",
                           as: "user_details",
                       },
                   },
                   {
                       $lookup: {
                           from: "products",
                           localField: "productId",
                           foreignField: "productId",
                           as: "product_details",
                        },
                    },
                    {
                       $unwind:{path:"$product_details"}
                    },
                   {
                       $unwind:{path:"$user_details"}
                   },
                   {
                     $addFields:{
                       userId:"$user_details.userId",
                       userName:"$user_details.userName",
                       productPrice:"$product_details.productPrice"
                     }
                   },
                   {
                       $project:{
                           user_details:0,
                           product_details:0,
                           buyPrdouctUserId:0,
                           createdAt:0
                       }
                   }
               ])
            return res.status(200).json({ status: true, data:[{debitTransaction:debitTransactionData,type:"debit"},{creditTransaction:creditTransactionData,type:"credit"}], message: "Transaction History Get SuccessFully" });
        }
        else{
            const debitTransactionData = await transaction.aggregate([
             {
                $match:{userId:userData.userId}
             },
             {
                $match:{type:"debit"}
             },
             {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "productId",
                    as: "product_details",
                 },
             },
             {
                $unwind:{path:"$product_details"}
             },
             {
                $addFields:{
                    productName:"$product_details.productName",
                    productType:"$product_details.productType",
                    productColor:"$product_details.productColor",
                    image:"$product_details.image"
                }
             },
             {
                $project:{
                    product_details:0 ,
                    createdAt:0,
                    buyPrdouctUserId:0
                }
             }
            ])
            // console.log(debitTransactionData,"debitTransactionData");
    
            const creditTransactionData = await transaction.aggregate([
                {
                   $match:{userId:userData.userId}
                },
                {
                   $match:{type:"credit"}
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "buyPrdouctUserId",
                        foreignField: "userId",
                        as: "user_details",
                    },
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "productId",
                        as: "product_details",
                     },
                 },
                 {
                    $unwind:{path:"$product_details"}
                 },
                {
                    $unwind:{path:"$user_details"}
                },
                {
                  $addFields:{
                    userId:"$user_details.userId",
                    userName:"$user_details.userName",
                    productPrice:"$product_details.productPrice"
                  }
                },
                {
                    $project:{
                        user_details:0,
                        product_details:0,
                        buyPrdouctUserId:0,
                        createdAt:0
                    }
                }
            ])
            // console.log(creditTransactionData,"debitTransactionData");
            return res.status(200).json({ status: true, data:[{debitTransaction:debitTransactionData,type:"debit"},{creditTransaction:creditTransactionData,type:"credit"}], message: "Transaction History Get SuccessFully" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

module.exports = {
    getUserTransaction,
}