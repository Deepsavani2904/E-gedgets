import { TRANSACTION } from "../types/types";

export const transactionReducer = (state =[],action) =>{
    switch(action.type){
        case TRANSACTION:{
            return action.data
        }
        default:{
            return state
        }
    }
}