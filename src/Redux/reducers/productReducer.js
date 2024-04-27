import { GETPRODUCTDATA } from "../types/types"

export const productReducer = (state= [],action) =>{
    switch(action.type){
        case GETPRODUCTDATA:{
            return action.data
        }
        default:{
            return state
        }
    }
}