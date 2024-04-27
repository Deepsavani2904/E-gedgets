import React, { useEffect, useState } from "react";
import { HOC } from "./HOC";
import { useDispatch, useSelector } from "react-redux";
// import { getProductApi } from "../../../Redux/action/action";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getProductApi } from "../../../Redux/action/action";
import Swal from "sweetalert2";
// import { HOCUSER } from "./HOCUSER";

const UserBuyProduct = () => {
  const [token, settoken] = useState()
  const state = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    let isLoginObj = JSON.parse(localStorage.getItem('isLogin'));
    const token = isLoginObj.token;
    dispatch(getProductApi(token))
    settoken(token)
}, [])

    const BuyProduct = (id) =>{
      console.log(id,"id");
       const x = JSON.parse(localStorage.getItem('isLogin'));
      //  console.log(x.data.userId);
      const userId =x.data.userId;
      const obj ={
        userId: userId,
        productId:id
      }
       
      axios.post("http://localhost:5000/api/buyProduct/add",obj,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }).then((res) =>{
        if(res.data.status){
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: true,
            timer: 2500
          });
        }
        else{
          Swal.fire({
            icon: "error",
            title:res.data.message,
            showConfirmButton: true,
            timer: 2500
          });
        }
        console.log(res.data.message,"data");
        
      })
  
}
  return (
    <>
        <div className="container mt-5">
               <div className="row">
                      { state.map((x) =>{
                      return <div className="col-4 mt-3">
                            <div className="products_list-item shadow-lg" style={{borderRadius:"20px"}}>
                                  <div className="products_list-item_wrapper d-flex flex-column">
                                        <div className="media">
                                          <a href="#">
                                          <img className="lazy preview entered loaded" data-src="img/wishlist/04.jpg"
                                           
                                           src={`http://localhost:5000/api/images/${x.image}`} alt="Tangerine Dream" data-ll-status="loaded"/>
                                          </a>
                                        
                                        </div>
                                     <div className="main d-flex flex-column align-items-center justify-content-between">
                                          
                                            <a class="main_title" href="product.html" target="_blank" rel="noopener norefferer">
                                            {x.productName}
                                            </a>

                                            <ul class="main_table d-flex flex-column align-items-center p-0">
                                                    <li class="list-item"><span class="property">Color:  </span> 
                                                    <span class="value">{x.productColor}</span></li>
                                                    <li class="list-item"><span class="property">Type:   </span>
                                                     <span class="value">{x.productType}</span></li>
                                            </ul>
                                                <div className="description">
                                                  {x.description}
                                                </div>
                                            <div class="main_price">
                                                  <span class="price">₹{x.productPrice}</span>
                                            </div>
                                       </div>
                                    <div className="d-flex justify-content-center">
                                    <button className="btn btn-outline-warning me-2" onClick={()=>BuyProduct(x.productId)} >Buy Product</button>
                                    {/* <button className="btn btn-danger" onClick={() =>deleteData(x._id)}>Delete</button> */}
                                    </div>
                                </div> 
                            </div> 
                      </div>

                      })
                      }

              </div>
      </div>
      <ToastContainer />
    </>
  )
};

export default HOC(UserBuyProduct);




