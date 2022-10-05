
// Actions // tipo de accion (LOGIN,LOGOUT, UPDATE)
import { LOGIN } from "./ActionTypes"
import { LOGOUT } from "./ActionTypes"
import { UPDATESTATE } from "./ActionTypes"


// Action creators
export const login = () => ({
    type: LOGIN,
})

export const logout = () => ({
    type: LOGOUT,
})

export const updateState = () => ({
    type: UPDATESTATE
})

// Initial state
const initialState = {
    usuario: {
        id:null,
        tipo:'',
        nombre: '',
        apellido: '',
        email: '',
        password: '', 
        foto:'',
        isLoggedIn:false
    },
    
}

// Root reducer
const MyReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                ...action.payload,
                isLoggedIn:true
            }
        case LOGOUT:
            return {
                ...state,
                ...action.payload,
                isLoggedIn:false
            }
        case UPDATESTATE:
            return {
                ...state,
                ...action.payload,
                isLoggedIn:false
            }
        default:
            return state
    }
}

export default MyReducer;
