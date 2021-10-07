import axios from "axios";

const AuthActionType = {
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAIL: "REGISTER_FAIL",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAIL: "LOGIN_FAIL",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_FAIL: "LOGOUT_FAIL",
};

const RegisterAuthAction = (userState, history) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("/users/signup/", userState, );
            const { data } = res
            console.log(data);
            dispatch({type: AuthActionType.REGISTER_SUCCESS, payload: data})
            history.push("/")
        } catch (error) {
            console.error(error);
            dispatch({type: AuthActionType.REGISTER_FAIL, payload: {} })
        }
    }
}

const LoginAuthAction = (loginState, history) => {
    return async (dispatch) => {
        try {
            console.log("loginState", loginState)
            const res = await axios.post("/users/login/login/", loginState );
            const { data } = res
            console.log("datos del api", data);
            dispatch({type: AuthActionType.LOGIN_SUCCESS, payload: data})
            history.push("/")
        } catch (error) {
            console.error(error);
            dispatch({type: AuthActionType.LOGIN_FAIL, payload: {} })
        }
    }
}


const LogoutAuthAction = (history) => {
    return async (dispatch) => {
        try {
            const res = await axios.post("/users/logout/" );
            const { data } = res
            console.log(data);
            dispatch({type: AuthActionType.LOGOUT_SUCCESS, payload: data.message })
            history.push("/")
        } catch (error) {
            console.error(error);
            dispatch({type: AuthActionType.LOGOUT_FAIL, payload: {} })
        }
    }
}


export { RegisterAuthAction, LogoutAuthAction, LoginAuthAction, AuthActionType }