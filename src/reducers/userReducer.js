
const INITIAL_STATE = { //harus sama yg di postman
    id : null,
    username : '',
    email : '',
    role : '',
    register_status: false
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'LOGIN' :
            return { //harus sama yg di postman
                id : action.payload.id_users,
                username : action.payload.username,
                email : action.payload.email,
                role : action.payload.role
            }
        case 'UPDATE_CART' :
            return {
                ...state, cart: action.payload
            }
        case 'LOG_OUT' :
        return INITIAL_STATE
        default : 
        return state
    }
}