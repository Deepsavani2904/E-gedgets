import axios from "axios";
import { toast } from "react-toastify";
import { ADDUSER, BUYPRODUCTDATA, GETPRODUCTDATA, LOGINUSER, LOGOUTUSER, ONLYUSERBUYPRODUCT, TRANSACTION, WALLETDATA } from "../types/types";
import Swal from "sweetalert2";

// Register
export const addUserData = (obj) => {
  return () => {
 
    axios.post("http://localhost:5000/api/auth/register", obj).then((res) => {
      if (res.data.status) {
        Swal.fire({
            icon: "success",
            title: "Registration SuccessFully",
            text: res.data.message,
          });
      } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
      }
    });
  };
};

//Login
export const userLogin = (obj) => {
  return (dispatch) => {
    axios.post("http://localhost:5000/api/auth/login", obj).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch({type:LOGINUSER ,isLogin:res.data})
      } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email or Password is incorrect.",
          });
         console.log('reject')
      }
    }).catch((error) =>{
        console.log("error",error);  
    })
  };
};


//Log Out
export const logOutUser = () =>{
    return (dispatch) =>{
        dispatch({type:LOGOUTUSER})
    }
}


//Add User Api Crud Start

//Get Api 
export const getProfileApi = (token) =>{
    return (dispatch) =>{
        axios.get("http://localhost:5000/api/user/get",{
            headers : {
                Authorization:  `Bearer ${token}`
             }
        }).then((res) =>{
            if(res.data.status){
                dispatch({type:ADDUSER ,data:res.data.data})
            }
        }).catch((error) =>{
            console.log(error);  
        })
    }
}

//Add Api
export const addUserApi = (token,obj)=>{
    return (dispatch) =>{
        const startTime = performance.now();
        axios.post("http://localhost:5000/api/user/add",obj,{
            headers : {
                Authorization:  `Bearer ${token}`
             }
        }).then((res) =>{
            if(res.data.status){
                dispatch(getProfileApi(token))
                toast.success(res.data.message, {
                    position: toast.POSITION.TOP_CENTER
                  });
            }
            else{
                toast.error(res.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }).catch((error) =>{
            console.log(error);  
        })
        const endTime = performance.now();
        const duration = endTime - startTime;
        console.log(duration,"duration");
    }
}

//Update Data 
export const updateUserData = (token,obj,id) =>{
    return (dispatch) =>{
        axios.post("http://localhost:5000/api/user/update?id="+id,obj,{
            headers : {
                Authorization:  `Bearer ${token}`
             }
        }).then((res) =>{
            if(res.data.status){
                dispatch(getProfileApi(token))
                toast.success(res.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            else{
                toast.error(res.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }).catch((error) =>{
            console.log(error);  
        })
    }
}


//Delete Api

export const deleteApiData = (token,deleteId) =>{
    return (dispatch) =>{
        axios.delete("http://localhost:5000/api/user/delete/"+deleteId,{
            headers : {
                Authorization:  `Bearer ${token}`
             } 
        }).then((res) =>{
            if(res.data.status){
                dispatch(getProfileApi(token))
                toast.success(res.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            else{
                toast.error(res.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });    
            }
        }).catch((error) =>{
            console.log(error);  
        })
    }
}



// Product Crud Start
//Get Api Data
export const getProductApi = (token) =>{
    return (dispatch) =>{
        axios.get("http://localhost:5000/api/product/get",{
            headers : {
                Authorization:  `Bearer ${token}`
             } 
        }).then((res) =>{
            if(res.data.status){
                dispatch({type:GETPRODUCTDATA,data:res.data.data})
            }
        }).catch((error) =>{
            console.log(error);  
        })
    }
}

//Add Api Data 

export const addProductData = (token,obj) =>{
    return (dispatch) =>{
        axios.post("http://localhost:5000/api/product/add",obj,{
            headers : {
                Authorization:  `Bearer ${token}`
             } 
        }).then((res) =>{
            if(res.data.status){
                dispatch(getProductApi(token));
                toast.success(res.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            else{
                toast.error(res.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }).catch((error) =>{
            console.log(error);   
        })
    }
}


//Update Api 
export const updateProductData = (token,obj,id) =>{
    return (dispatch) =>{
        axios.patch("http://localhost:5000/api/product/update?id="+id,obj,{
            headers : {
                Authorization:  `Bearer ${token}`
             } 
        }).then((res) =>{
            if(res.data.status){
                dispatch(getProductApi(token));
                toast.success(res.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            else{
                toast.error(res.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }).catch((error) =>{
            console.log(error);   
        })
    }
}


//delete Api
export const deleteProductData = (token,id) =>{
    return (dispatch) =>{
        axios.delete("http://localhost:5000/api/product/delete/"+id,{
            headers : {
                Authorization:  `Bearer ${token}`
             } 
        }).then((res) =>{
            if(res.data.status){
                dispatch(getProductApi(token));
                toast.success(res.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            else{
                toast.error(res.data.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }).catch((error) =>{
            console.log(error);   
        })
    }
}

//User All buyProduct Data 
export const getallBuyproductData = (token) =>{
    return (dispatch) =>{
        axios.get('http://localhost:5000/api/buyProduct/allget',{
            headers : {
                Authorization:  `Bearer ${token}`
             } 
        }).then((res)=>{
            if(res.data.status){
                dispatch({type:BUYPRODUCTDATA,data:res.data.data})
            }
        }).catch((error) =>{
            console.log(error);    
        })
    }
}

//only user Product data 
export const getOnlyUserBuyProductData = (token) =>{
   return (dispatch) =>{
    try {
        axios.get("http://localhost:5000/api/buyProduct/userget",{
            headers : {
                Authorization:  `Bearer ${token}`
             }  
        }).then((res) =>{
            if(res.data.status){
                dispatch({type:ONLYUSERBUYPRODUCT,data:res.data.data})
            }
        })
    } catch (error) {
        console.log(error);
    }
   }
}



// User Wallet 
export const getWalletData = (token) =>{
   return (dispatch) =>{
    try {
        axios.get("http://localhost:5000/api/buyProduct/wallte",{
            headers : {
                Authorization:  `Bearer ${token}`
             }  
        }).then((res) =>{
            if(res.data.status){
                dispatch({type:WALLETDATA,data:res.data.data})
            }
        })
    } catch (error) {
        console.log(error);
    }
   }
}


// Transaction
export const getTransactionData = (token) =>{
    return (dispatch) =>{
        try {
            axios.get('http://localhost:5000/api/buyProduct/transaction',{
                headers : {
                    Authorization:  `Bearer ${token}`
                 }   
            }).then((res) =>{
                dispatch({type:TRANSACTION,data:res.data.data})
            }).catch((error) => console.log(error))
        } catch (error) {
            console.log(error);
        }
    }
}