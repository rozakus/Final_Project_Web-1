// import
import { GET_CART_USER } from '../actions'

// set global state
const INITIAL_STATE = {
    // cart: {},
    resultPcs: [],
    resultPkg: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CART_USER: return {
            ...state,
            // cart: action.payload,
            resultPcs: action.payload.resultPcs,
            resultPkg: action.payload.resultPkg,
        }
        default: return state
    }
}

export default cartReducer