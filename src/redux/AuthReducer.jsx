import { AuthActionType } from "./actions/AuthAction";


const authState = {
    isLoggedIn: false,
    user: {
        username: "",
        password: "",
    },
    token: ""
}

const authReducer = (state = authState, action) => {

    switch (action.type) {
        case AuthActionType.REGISTER_SUCCESS:            
            return {
                isLoggedIn: true,
                user: action.payload,
                token: ""
            }
        case AuthActionType.REGISTER_FAIL:            
            return state;
    
        default:
            return state;
    }

    return state;
};

export default authReducer;