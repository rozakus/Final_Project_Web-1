// import combine reducers
import { combineReducers } from 'redux';

// import reducers
import { userReducer } from './userReducer';
import productReducer from './productReducer'

//combine all reducers
const Reducers  = combineReducers ({
    userReducer,
    productReducer
})

export default Reducers;