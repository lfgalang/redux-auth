

const authState = {
    isLoggedIn: false,
    user: {
        name: "",
        expires_at: "",
        jwtToken: "",
        authorities: [""]
    }
}

const authReducer = (state = authState, action) => {
    return state;
};

export default authReducer;