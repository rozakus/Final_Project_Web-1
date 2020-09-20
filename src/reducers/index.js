// import combine reducers
import { combineReducers } from 'redux';

// import reducers
import { userReducer } from './userReducer';
import productReducer from './productReducer'
import {historyReducer} from './historyReducer'

//combine all reducers
const Reducers  = combineReducers ({
    userReducer,
    productReducer,
    historyReducer
})

export default Reducers;