const loginUSer = (userObj) => {
    return {
        type: "LOGIN",
        payload: userObj
    }
}

const logoutUSer = () => {
    return {
        type: "LOGOUT"
    }
}

export default {
    loginUSer,
    logoutUSer
}