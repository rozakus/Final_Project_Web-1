import { GET_ALLPRODUCT, GET_ALLPRODUCTPACKAGE, GET_ALLPRODUCT_BYCATEGORY } from '../actions';

// intiale state
const INITIAL_STATE = {
    products: [],
    productPackage: []
};

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALLPRODUCT:
            return { ...state, products: action.payload };

        case GET_ALLPRODUCT_BYCATEGORY:
            return { ...state, products: action.payload }

        case GET_ALLPRODUCTPACKAGE:
            return { ...state, productPackage: action.payload }

        default: return state;
    }
};

export default productReducer;
