// import
import Axios from 'axios'
import { URL, GET_ALLPRODUCT, GET_ALLPRODUCT_BYCATEGORY, GET_ALLPRODUCTPACKAGE } from './helpers'

// get product
export const getAllProducts = () => {
    return async (dispatch) => {
        try {
            // request data to API
            const res = await Axios.get(URL + '/getAllProducts');
            dispatch({ type: GET_ALLPRODUCT, payload: res.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    };
};

// get product by category
export const getAllProducts_byCategory = (idCategory) => {
    return async (dispatch) => {
        try {
            // request data to API
            const res = await Axios.get(URL + '/getProdCate3/' + idCategory);
            dispatch({ type: GET_ALLPRODUCT_BYCATEGORY, payload: res.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    }
}

// get all oroduct package
export const getAllProductPackage = () => {
    return async (dispatch) => {
        try {
            // request data to API
            const res = await Axios.get(URL + '/getAllProductPackage');
            dispatch({ type: GET_ALLPRODUCTPACKAGE, payload: res.data });
        } catch (err) {
            console.log(err.response ? err.response.data : err);
        }
    };
};