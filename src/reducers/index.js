import { combineReducers } from 'redux';

//import reducers
import { userReducer } from './userReducer';

//combine all reducers
const Reducers  = combineReducers ({
    userReducer,
})

export default Reducers;