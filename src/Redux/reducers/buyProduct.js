import { BUYPRODUCTDATA } from "../types/types";

export const buyProductData = (state= [],action) =>{
    switch(action.type){
        case BUYPRODUCTDATA:{
            return action.data
        }
        default:{
            return state
        }
    }
}