const initialState = {

    user:'',
    idUsuario:'',
    tipo:'',
    nombre:'',
    apellido:'',
    dni:'',
    email:'',
    password:'',
    foto:'',
    loggedIn:false,

}


const CurrentUser = (state =initialState, action) => {
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                idUsuario: action.payload,
                tipo: action.payload,
                nombre: action.payload,
                apellido: action.payload,
                dni: action.payload,
                email: action.payload,
                password: action.payload,
                foto: action.payload,
                loggedIn: true
            }
        case "LOGOUT":
            return {
                ...state,
                state: initialState,
                loggedIn: false
            }
        default:
            return state
    }
}

export default CurrentUser;