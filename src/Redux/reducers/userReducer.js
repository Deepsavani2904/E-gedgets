import { ADDUSER } from "../types/types";

export const userReducer = (state= [],action) =>{
    switch(action.type){
        case ADDUSER :{
            return action.data
        }
        default:{
            return state
        }
    }
}