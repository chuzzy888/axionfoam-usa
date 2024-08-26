import { ActionTypes } from "../constants/action-types";

const initialState = {
    products:[]
}


export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
         return [...state, action.payload]
    
        default:
            break;
    }
}