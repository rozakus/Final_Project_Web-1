// import
import Axios from 'axios'
import { URL, GET_PRODUCT } from './helpers'

// get product
export const getProducts = () => {
    return async (dispatch) => {
        try {
            // request data to API
            const res = await Axios.get(URL + '/getAllProducts');
            dispatch({ type: GET_PRODUCT, payload: res.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    };
};