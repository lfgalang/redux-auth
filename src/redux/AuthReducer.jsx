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
console.log(getAuthState())

const newAuth = getAuthState()

const authReducer = (state = newAuth, action) => {
    switch (action.type) {
        case AuthActionType.REGISTER_SUCCESS: 
            const newAuthState = {
                isLoggedIn: true,
                user: action.payload,
                token: ""
            };
            localStorage.setItem("auth", JSON.stringify(newAuthState))
            return newAuthState;

        case AuthActionType.REGISTER_FAIL:            
            return state;
    
        default:
            return state;
    }
};





export default authReducer;