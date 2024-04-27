import { WALLETDATA } from "../types/types";

export const wallteReducer = (state = [],action) =>{
    switch(action.type){
        case WALLETDATA:{
            return action.data
        }
        default :{
            return state
        }
    }
}