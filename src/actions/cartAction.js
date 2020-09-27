// import
import Axios from 'axios'
import { URL, GET_CART_USER } from './helpers'

// get user cart
export const getCartUser = (id_user) => {
    return async (dispatch) => {
        try {
            // req api
            const getCart = await Axios.get(URL + '/getusercart/' + id_user)
            // console.log('get cart action : ', getCart.data)

            // store response
            dispatch({ type: GET_CART_USER, payload: getCart.data })

        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}

export const payment = (data, users_id, order_number, payment_type, amount) => {
    return async (dispatch) => {
        try {
            const option = { headers: { "Content-Type": "multipart/form-data" } };
            await Axios.post(URL + '/payment/' + users_id + '/' + order_number + '/' + payment_type + '/' + amount, data, option)
            // console.log(res.data);
        } catch (err) {
            console.log(err ? err.response.data : err);
        }
    };
};