import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionData } from "../../../Redux/action/action";
import moment from "moment";
import { HOC } from "./HOC";
import { Outlet } from "react-router-dom";

const Transaction = () => {
//   const state = useSelector((state) => state.transaction);
//   const [check, setCheck] = useState("");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const isLoginObj = JSON.parse(localStorage.getItem("isLogin"));
//     setCheck(isLoginObj.data.role)
//     const token = isLoginObj.token;
//     dispatch(getTransactionData(token));
//   }, []);

  return (
    <>
    {/* <div class="container-fluid pt-5 pb-3">
        <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Transaction History</span></h2>
        <div class="row" style={{gap:"10px"}}>
       {
        check == "admin"?
        <>
        {
          state?.map((item,index) =>{
            return (
                <>
                {
                    item.type == "debit"?
                    <>
                     {
                        item?.debitTransaction.map((x,index) =>{
                                return<div key={index} class="col-lg-3 col-md-4 col-sm-6 pb-1 pe-0 ps-0">
                                            <div class="product-item bg-light mb-4">
                                                <div class="product-img position-relative overflow-hidden" style={{height:"211px"}}>
                                                    <img class="img-fluid w-100 h-100" src={`http://localhost:5000/api/images/${x.image}`} alt=""/>
                                                    <div class="product-action">
                                                        <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                                                        <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                                        <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                                        <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                <div class="text-center p-4">
                                                    <a class="h6 text-decoration-none text-truncate" href="">{x.productName}</a>
                                                    <div class="d-flex align-items-center flex-column mt-2">
                                                        <h5 style={{width:"100%",fontSize:"15px",textAlign:"left"}}>PurchaseAmount: <b>{x.purchaseAmount}₹</b></h5>
                                                        <h5 style={{width:"100%",fontSize:"15px",textAlign:"left"}}>ProductType: <b>{x.productType}</b></h5>
                                                        <h5 style={{width:"100%",fontSize:"15px",textAlign:"left"}}>ProductColor: <b>{x.productColor}</b></h5>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-center mb-1">
                                                        <h6>{moment(x.updatedAt).fromNow()}</h6>
                                                    </div>
                                            </div>
                                    </div>
                                </div>
                        })
                     }   
                    </>
                    :
                    <>
                        {
                            item?.creditTransaction?.map((x,index) =>{
                                        return <div class="col-lg-3 col-md-4 col-sm-6 pb-1 pe-0 ps-0">
                                                    <div class="product-item bg-light mb-4">
                                                        <div class="text-center p-4">
                                                            <div class="d-flex align-items-center flex-column mt-2">
                                                                <h5 style={{width:"100%",fontSize:"15px",textAlign:"left"}}>UserName({x.userId}): {x.userName}</h5>
                                                                <h5 style={{width:"100%",fontSize:"15px",textAlign:"left"}}>PurchaseAmount: <b>{x.productPrice}₹</b></h5>
                                                                <h5 style={{width:"100%",fontSize:"15px",textAlign:"left"}}>CreditAmount: <b>{x.purchaseAmount}₹</b></h5>
                                                            </div>
                                                            <div class="d-flex align-items-center justify-content-center mb-1">
                                                                <small class="fa fa-star text-primary mr-1"></small>
                                                                <small class="fa fa-star text-primary mr-1"></small>
                                                                <small class="fa fa-star text-primary mr-1"></small>
                                                                <small class="fa fa-star text-primary mr-1"></small>
                                                                <small class="fa fa-star text-primary mr-1"></small>
                                                                <h6>{moment(x.updatedAt).fromNow()}</h6>
                                                        </div>
                                             </div>
                                    </div>
                            </div>
                        })    
                        }
                    </>
                }
              </>
            )
          })
        }
        </>
        :
        <>
        {
          state?.map((item,index) =>{
            return (
                <>
                {
                    item.type == "debit"?
                    <>
                     {
                        item?.debitTransaction.map((x,index) =>{
                                return<div key={index} class="col-lg-3 col-md-4 col-sm-6 pb-1 pe-0 ps-0">
                                            <div class="product-item bg-light mb-4">
                                                <div class="product-img position-relative overflow-hidden" style={{height:"211px"}}>
                                                    <img class="img-fluid w-100 h-100" src={`http://localhost:5000/api/images/${x.image}`} alt=""/>
                                                    <div class="product-action">
                                                        <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                                                        <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                                        <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                                        <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                                                    </div>
                                                </div>
                                                <div class="text-center p-4">
                                                    <a class="h6 text-decoration-none text-truncate" href="">{x.productName}</a>
                                                    <div class="d-flex align-items-center flex-column mt-2">
                                                        <h5 style={{width:"100%",fontSize:"15px",textAlign:"left"}}>PurchaseAmount: <b>{x.purchaseAmount}₹</b></h5>
                                                        <h5 style={{width:"100%",fontSize:"15px",textAlign:"left"}}>ProductType: <b>{x.productType}</b></h5>
                                                        <h5 style={{width:"100%",fontSize:"15px",textAlign:"left"}}>ProductColor: <b>{x.productColor}</b></h5>
                                                    </div>
                                                    <div class="d-flex align-items-center justify-content-center mb-1">
                                                        <h6>{moment(x.updatedAt).fromNow()}</h6>
                                                    </div>
                                            </div>
                                    </div>
                                </div>
                        })
                     }   
                    </>
                    :
                    <>
                        {
                            item?.creditTransaction?.map((x,index) =>{
                                        return <div class="col-lg-3 col-md-4 col-sm-6 pb-1 pe-0 ps-0">
                                                    <div class="product-item bg-light mb-4">
                                                        <div class="text-center p-4">
                                                            <div class="d-flex align-items-center flex-column mt-2">
                                                                <h5 style={{width:"100%",fontSize:"15px",textAlign:"left"}}>UserName({x.userId}): {x.userName}</h5>
                                                                <h5 style={{width:"100%",fontSize:"15px",textAlign:"left"}}>PurchaseAmount: <b>{x.productPrice}₹</b></h5>
                                                                <h5 style={{width:"100%",fontSize:"15px",textAlign:"left"}}>CreditAmount: <b>{x.purchaseAmount}₹</b></h5>
                                                            </div>
                                                            <div class="d-flex align-items-center justify-content-center mb-1">
                                                                <small class="fa fa-star text-primary mr-1"></small>
                                                                <small class="fa fa-star text-primary mr-1"></small>
                                                                <small class="fa fa-star text-primary mr-1"></small>
                                                                <small class="fa fa-star text-primary mr-1"></small>
                                                                <small class="fa fa-star text-primary mr-1"></small>
                                                                <h6>{moment(x.updatedAt).fromNow()}</h6>
                                                        </div>
                                             </div>
                                    </div>
                            </div>
                        })    
                        }
                    </>
                }
              </>
            )
          })
        }
        </>
       }
    
        </div>
    </div> */}
    <Outlet />
    </>
  );
};

export default HOC(Transaction);

// { 
//  <Table responsive className="mt-5" hover variant="white">
//    <thead>
//      <tr>
//        <th>UserId</th>
//        <th>Debit</th>
//        <th>Credit</th>
//        <th>Date</th>
//      </tr>
//    </thead>
//    <tbody>
//      {state.map((x, i) => {
   
//          console.log(x,"X") 

//        return (
//          <tr key={i}>
//            {x.type == "credit" ? 
//              <>
//                <td>{x.userId}</td>
//                <td>{x.purchaseAmount}₹</td>
//                {/* <td>{x.updatedAt}</td> */}
//                <td>{moment(x.updatedAt).fromNow()}</td>
//              </>

//             : 
//              <>
//                <td>{x.userId}</td>
//                <td>{x.purchaseAmount}₹</td>
//                <td>{x.updatedAt}</td>
//                {/* <td>{x.productColor}</td>
//                <td>{x.referPersonUserId}</td>
//                <td>{x.purchaseAmount}₹</td>
//                <td>{x.referPersonAmount}₹</td> */}
//              </>
             
//            }
         
//          </tr>
//        );
//      })}
//    </tbody>
//  </Table>
//  }