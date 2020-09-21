// import
import Axios from 'axios'
import { URL, GET_CART_USER } from './helpers'

// get user cart
export const getCartUser = (id_user) => {
    return async (dispatch) => {
        try {
            // req api
            const getCart = await Axios.get(URL + '/getusercart/' + id_user)
            console.log(getCart.data)

            // store response
            dispatch({ type: GET_CART_USER, payload: getCart.data })

        } catch (err) {
            console.log(err.response ? err.response.data : err)
        }
    }
}