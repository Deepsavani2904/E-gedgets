const buyProduct = require("../model/buyProductSchema");
const product = require("../model/productSchema");
const transaction = require("../model/transactionSchema");
const user = require("../model/userSchema");
const wallet = require("../model/walletSchema");
// const user = require("../model/userSchema");

const getBuyProduct = async (req, res) => {
  try {
    const data = await buyProduct.find();
    return res
      .status(200)
      .json({ status: true, data: data, messgae: "Product Get SuccessFully" });
  } catch (error) {
    console.log(error);
  }
};

// const result = await buyProduct.deleteMany({}); => For delete All database Data
const addBuyProduct = async (req, res) => {
  try {
    const walletData = await wallet.findOne({userId:req.body.userId});
    const userData = await user.findOne({userId:req.body.userId});
    const referPerson = await user.findOne({userId:userData.referPerson})
    // console.log(userData,"userData");
    // console.log(referPerson,"referPerson");
    let walletreferral;
    if(referPerson){
       walletreferral = await wallet.findOne({userId:referPerson.userId});
    }
    console.log(walletreferral,"walletreferral");

    const productData = await product.aggregate([
        {
            $match :{productId: req.body.productId}
        },
      ])

      const amount = walletData.amount - productData[0].productPrice
      if(amount <= 0){
        return res.status(200).json({ status: false, data: [], message: "You don't have enough money" });
      }
     const referralAmount = ( productData[0].productPrice * 5) / 100;
     const data = await buyProduct.create(req.body);
 
     if(referPerson){
       await wallet.updateOne({userId : referPerson.userId},{$set :{amount:walletreferral ? walletreferral.amount: 0 + referralAmount}})
     }
     await wallet.updateOne({userId : req.body.userId},{$set :{amount: amount}})

     await transaction.create({userId : req.body.userId,productId:productData[0].productId,purchaseAmount: productData[0].productPrice,type:"debit"})
     if(referPerson){
       await transaction.create({userId : referPerson.userId,buyPrdouctUserId:req.body.userId,productId:productData[0].productId,purchaseAmount: referralAmount,type:"credit"})
     }
    return res.status(200).json({ status: true, data: data, message: "Product Buy SuccessFully" });
  } catch (error) {
    console.log(error);
  }
};

// const combineProduct = async (req, res) => {
//   try {
//     const userData = await user.find();
//     const productData = await product.find();
//     const buyproduct = await buyProduct.find();
//     let allBuyProductData = [];

//     buyproduct.forEach((buyId) => {
//       const { userId, productId } = buyId;

//       const productList = productData.find(
//         (product) => product.productId === productId
//       );

//       const userList = userData.find((user) => user.userId === userId);

//       if (productList && userList) {
//         const userBuyProductList = {
//           userId: userList.userId,
//           userName: userList.userName,
//           productId: productList.productId,
//           productName: productList.productName,
//           productPrice: productList.productPrice,
//           productType: productList.productType,
//           image: productList.image,
//         };
//         allBuyProductData.push(userBuyProductList);
//       }
//     });

//     return res.status(200).json({status: true, data: allBuyProductData,messgae: "All User Buy Product Get SuccessFully"});
//   } catch (error) {
//     console.log(error);
//   }
// };

const combineProduct = async (req, res) => {
  try {
   
    const buyproduct = await buyProduct.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
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
        $unwind: {path:"$user_details"}
      },
      {
        $unwind: {path:"$product_details"}

      },
      {
        $addFields: {
          userName:"$user_details.userName",
          userId: "$user_details.userId",
          productId: "$product_details.productId",
          productName:"$product_details.productName",
          productPrice:"$product_details.productPrice",
          productType:"$product_details.productType",
          image :"$product_details.image",
        }
      },
      {
        $project :{
          user_details: 0,
          product_details: 0,
        }
      }
    ]);
    
    return res.status(200).json({status: true, data: buyproduct,messgae: "All User Buy Product Get SuccessFully"});
  } catch (error) {
    console.log(error);
  }
};

const userBuyProduct = async (req, res) => {
  try {
        const userData = await user.findOne({email:req.user});
        const buyProductList = await buyProduct.aggregate([
          {
            $match : {userId:userData.userId}
          },
          {
            $lookup :{
              from: "products",
              localField: "productId",
              foreignField: "productId",
              as: "product_details",
            }
          },
          {
            $unwind: {path:"$product_details"}
          },
          {
            $addFields: {
              // buyProductData : [
              //   {
                  productId: "$product_details.productId",
                  productName:"$product_details.productName",
                  productPrice:"$product_details.productPrice",
                  productType:"$product_details.productType",
                  productColor:"$product_details.productColor",
                  image :"$product_details.image",
              //   }
              // ]
            }
          },
          {
            $project :{
              product_details: 0
            }
          }
        ])
        return res.status(200).json({status: true, data: buyProductList,messgae: "All User Buy Product Get SuccessFully"});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getBuyProduct,
  addBuyProduct,
  combineProduct,
  userBuyProduct,
};

/* ==========> Combine product Data Using Loop Start =>Admin <=========== */
// const combineProduct = async (req, res) => {
//     try {
//       const userData = await user.find();
//       const productData = await product.find();
//       const buyproduct = await buyProduct.find();
//       let allBuyProductData = [];

//       buyproduct.forEach((buyId) => {
//         const { userId, productId } = buyId;

//         const productList = productData.find((product) => product.productId === productId);

//         const userList = userData.find((user) => user.userId === userId);

//         if (productList && userList) {
//            const userBuyProductList = {
//             userId: userList.userId,
//             userName: userList.userName,
//             productId: productList.productId,
//             productName: productList.productName,
//             productPrice:productList.productPrice,
//             productType:productList.productType,
//             image : productList.image,

//           };
//           allBuyProductData.push(userBuyProductList);
//         }
//       });
//       return res.status(200).json({status:true,data:allBuyProductData,messgae:"All User Buy Product Get SuccessFully"})
//     }
//     catch(error){
//       console.log(error);
//     }
// }
/* ==========> Combine product Data Using Loop End =>Admin <=========== */

/* ===========> Combine product Data Using Loop Start =>User <=========== */
// const userBuyProduct = async (req, res) => {
//   try {
//         const userData = await user.findOne({email:req.user});
//         const productData = await product.find();
//         const buyproduct = await buyProduct.find({userId:userData.userId})
//         const buyProductList = []
//         buyproduct.forEach((item) =>{
//              const data = productData.find((x) => x.productId == item.productId);
//             buyProductList.push(data)  
//         })
//         return res.status(200).json({status: true, data: buyProductList,messgae: "All User Buy Product Get SuccessFully"});
//   } catch (error) {
//     console.log(error);
//   }
// };
/* ===========> Combine product Data Using Loop End =>User <=========== */


      // console.log(allBuyProductData);

//       //     let array = []
//       //       buyproduct.map((id) =>{
//       //          productData.map((x) =>{
//       //             if(x.productId == id.productId){
//       //               array.push(x)
//       //             }
//       //         })
//       //     })
//       //     let array2 =[]
//       //     buyproduct.map((id) =>{
//       //         userData.map((x) =>{
//       //            if(x.userId == id.userId){
//       //              array2.push(x)
//       //            }
//       //        })
//       //    })

//       //    let obj = {};

//       //    array2.map((x) =>{
//       //     obj.userId = x.userId
//       //     obj.userName = x.userName
//       //     // return x.userId,x.userName
//       //    })
//       //    console.log(obj,"arra");

//       // console.log(array,"ProductList");

//       //    const userId =userData.map((uitem) =>{
//       //        return uitem.userId
//       //     })

//       //     const productId =productData.map((uitem) =>{
//       //        return uitem.productId
//       //     })

//       // // Extract user and product IDs
//       // const userIds = userData.map((uitem) => uitem.userId);
//       // const productIds = productData.map((pitem) => pitem.productId);

//       // // Create an array to store the associations between user IDs and bought products
//       // const userProductList = [];

//       // // Iterate through the buyproduct array and associate users with bought products
//       // buyproduct.forEach((buyItem) => {
//       //   const { userId, productId } = buyItem;

//       //   // Check if both user and product IDs exist in the respective arrays
//       //   if (userIds.includes(userId) && productIds.includes(productId)) {
//       //     // Find the index of the user in the userProductList array
//       //     const userIndex = userProductList.findIndex((item) => item.userId === userId);

//       //     // If the user is not already in the array, add them
//       //     if (userIndex === -1) {
//       //       userProductList.push({
//       //         userId,
//       //         products: [productId],
//       //       });
//       //     } else {
//       //       // If the user is already in the array, add the product to their list
//       //       userProductList[userIndex].products.push(productId);
//       //     }
//       //     }})

//       //     console.log(userProductList,"userProductList");

//       // console.log(userId, "userId");
//       // console.log(productId, "productId");

//       // // console.log(userData,"userData");
//       // // console.log(buyproduct,"buyproduct");
//       // console.log(buyproduct, "productData");
//     } catch (error) {
//       console.log(error);

//     }
//   };





// const userBuyProduct = async (req, res) => {
//   try {
//         const userData = await user.findOne({email:req.user});
//         const productData = await product.find();
//         const buyproduct = await buyProduct.find({userId:userData.userId})
//         const buyProductList = []
//         buyproduct.forEach((item) =>{
//              const data = productData.find((x) => x.productId == item.productId);
//             //  console.log(y,"y");
//             buyProductList.push(data)
             
//         })
//         console.log(buyProductList,"product");
        

//       //    const productData = await product.find();
//       //   const userData = await user.findOne({ email: req.user });

//       //   let buyProductArray = [];

//       //   const userProductData = buyProductArray.filter((buyItem) => buyItem.userId == userData.userId);
//       //   console.log(userProductData);
        

//       //   const userProducts = userProductData.map((userProduct) => {
//       //     const productDetails = productData.find((productItem) => productItem.productId == userProduct.productId);
//       //     return productDetails;
//       //   });

//       // console.log(userProducts);
//     // const productData = await product.find();
//     // const userData = await user.findOne({ email: req.user });

//     // let buyProductArray = []; // Assuming this is the correct array to store user product purchases

//     // productData.forEach((productItem) => {
//     //   const userProductData = buyProductArray.filter((buyItem) => buyItem.userId == userData.userId);

//     //   userProductData.forEach((userProduct) => {
//     //     if (productItem.productId == userProduct.productId) {
//     //       console.log(productItem, "Product Details");
//     //     }
//     //   });
//     // });
//     // const buyproduct = await buyProduct.find();
//     // const productData = await product.find();
//     // const userData = await user.findOne({email:req.user});

//     // let buyProductArray = [];
//     // let productBuy = productData.find((x) => x.productId == userproductData.productId)
//     //   productData.forEach((x) =>{
//     //     const userproductData = buyproduct.find((x) => x.userId == userData.userId);
//     //     const productList =  productData.find((x) =>x.productId == userproductData.productId);
//     //     console.log(userproductData,"list");

//     // //  console.log(userproductData,"product");
//     // //    if(x.productId == userproductData.productId){
//     // //     console.log(x,"x");
//     // //    }
//     // //    else{
//     // //     // console.log(x,"ele");

//     // //    }

//     //   })
//     // console.log(productBuy,"id");

//     // buyproduct.forEach((buyId) =>{

//     //   // if()
//     //   const buyProductObj = {
//     //      userName: userData.userName,
//     //      userId: userData.userId,
//     //      productId: productBuy.productId,
//     //      productName: productBuy.productName,
//     //      productPrice:productBuy.productPrice,
//     //      image:productBuy.image,
//     //      productType:productBuy.productType,
//     //   }

//     //   buyProductArray.push(buyProductObj)
//     // })

//     // return res
//     //   .status(200)
//     //   .json({
//     //     status: true,
//     //     data: buyProductArray,
//     //     messgae: "Product Get SuccesFully",
//     //   });
//   } catch (error) {
//     console.log(error);
//   }
// };
