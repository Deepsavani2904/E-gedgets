import { LOGINUSER, LOGOUTUSER } from "../types/types";

export const loginReducres = (state=JSON.parse(localStorage.getItem('isLogin')) || false,action) =>{
    switch(action.type){
        case LOGINUSER :{
          localStorage.setItem('isLogin',JSON.stringify(action.isLogin))
          return true
        }
        case LOGOUTUSER:{
          localStorage.removeItem('isLogin')
          return false
        }
        default :{
            return state
        }
    }
}