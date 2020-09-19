
const INITIAL_STATE = { //harus sama yg di postman
    id : null,
    username : '',
    email : '',
    role : '',
    register_status: false,
    address : '',
    picture : ''
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'LOGIN' :
            return { //harus sama yg di postman
                ...state,
                id : action.payload.id_users,
                username : action.payload.username,
                email : action.payload.email,
                role : action.payload.role,
                address : action.payload.address,
                picture : action.payload.picture
            }
        case 'REGISTER' :
            return {...state,
                id : action.payload.id,
                username : action.payload.username,
                email : action.payload.email,
                role : action.payload.role
            }
        case 'LOG_OUT' :
        return INITIAL_STATE
        default : 
        return state
    }
}