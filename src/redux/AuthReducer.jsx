import axios from "axios";
import { AuthActionType } from "./actions/AuthAction";


const authState = {
    isLoggedIn: false,
    user: {
        username: "",
        password: "",
    },
    token: ""
}

const getAuthState = () => {
    const auth = localStorage.getItem("auth")
    try {
        const authObj = JSON.parse(auth);
        const { token } = authObj.user;
        return authObj;
    } catch (error) {
        return authState;
    }
}
const newAuth = getAuthState()
console.log("1", newAuth.token)

const authReducer = (state = newAuth, action) => {
    switch (action.type) {
        case AuthActionType.REGISTER_SUCCESS: 
            const newAuthState = {
                isLoggedIn: true,
                user: action.payload,
                token: "Tokenkenken"
            };
            axios.defaults.headers.common[
                "Authorization"
            ] = `Token ${newAuth.token}`;
            console.log(action.payload)
            localStorage.setItem("auth", JSON.stringify(newAuthState))
            return newAuthState;

        case AuthActionType.LOGOUT_SUCCESS:
            localStorage.removeItem("auth")
            return authState;
        case AuthActionType.LOGOUT_FAIL:
            localStorage.removeItem("auth")
            return authState;

        case AuthActionType.LOGIN_SUCCESS:
            console.log("AuthActionType",action.type)
            console.log( "action.payload", action.payload)
            console.log( "action.payload.token", action.payload.token)
            const loginAuthState = {
                isLoggedIn: true,
                user: action.payload.user,
                token: action.payload.token,
            };
            axios.defaults.headers.common["Authorization"] = `Bearer tokensito`;
            
            localStorage.setItem("auth", JSON.stringify(loginAuthState));
            return loginAuthState;

        case AuthActionType.LOGIN_FAIL:            
            return authState;

        case AuthActionType.REGISTER_FAIL:            
            return state;
    
        default:
            return state;
    }
};





export default authReducer;