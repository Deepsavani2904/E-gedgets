import { ONLYUSERBUYPRODUCT } from "../types/types";

export const onlyUserBuyProduct = (state=[],action) =>{
    switch(action.type){
        case ONLYUSERBUYPRODUCT:{
            return action.data
        }
        default:{
            return state
        }
    }
}