import { GET_PRODUCT } from '../actions';

// intiale state
const INITIAL_STATE = {
    products: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCT:
            return { ...state, products: action.payload };
        default:
            return state;
    }
};

export default productReducer;
