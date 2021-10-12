import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { LoginAuthAction } from '../../redux/actions/AuthAction'
import "./login.css"

function Login(props) {

    const [loginState, setLoginState] = useState({});
    const history = useHistory();
    
    const { login } = props;

    return (
        <div>
            <Header/>
            <div className="fondol sign-in-main">
                <div className="container d-flex">
                <div className="sign-in-container py-5 m-auto border">
                    <div className="sign-in-header">
                    <h4 className="font-weight-bold">Login</h4>
                    <p className="sign-in-intro">
                        <span className="text-muted">Diseño de elementos estructurales </span>
                        <span className="text-danger font-weight-bold">Sign Up</span>
                    </p>
                    <div className="login-social-media py-3">
                        <button className="btn btn-primary btn-block btn-sm">
                        Continue with Google
                        </button>
                    </div>
                    </div>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        login(loginState, history)
                        console.log(loginState)
                    }} >
                    <div className="form-group">
                        <label htmlFor="InputEmail">Email address</label>
                        <input
                            type="email"
                            className="form-control form-control-sm"
                            onChange = {(event) => {
                                const email = event.target.value;
                                setLoginState({...loginState, ...{email}})
                            }}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                        Tu contraseña y datos estan seguros
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control form-control-sm"
                            onChange = {(event) => {
                                const password = event.target.value;
                                setLoginState({...loginState, ...{password}})
                            }}
                        />
                    </div>
                    <button type="submit" className="btn btn-danger btn-sm">
                        Submit
                    </button>
                    </form>
                </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}



const mapStateToProps = (state) => {
    return {
        user: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (loginState, history) => {
            dispatch(LoginAuthAction(loginState, history))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
