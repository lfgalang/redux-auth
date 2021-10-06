import React, { useState } from 'react'
import { connect } from 'react-redux'
import Footer from '../layout/Footer'
import Header from '../layout/Header'
import "./register.css"

function Register(props) {


    //El userState es el objeto donde se va a almacenar la información de los formularios con el useState
    const [userState, setUserState] = useState({})

    //Los atributos que van para la funciones de redux
    const { user, register } = props

    return (
        <div>
            <Header />
            <div className="fondo sign-in-main">
                <div className="container d-flex">
                <div className="sign-in-container py-5 m-auto border">
                    <div className="sign-in-header">
                    <h4 className="font-weight-bold">Sign Up</h4>
                    <p className="sign-in-intro">
                        <span className="text-muted">Diseño de elementos estructurales </span>
                        <span className="text-danger font-weight-bold">Sign In</span>
                    </p>
                    <div className="login-social-media py-3">
                        <button className="btn btn-primary btn-block btn-sm">
                        Continue with Google
                        </button>
                    </div>
                    </div>
                    <form
                        onSubmit= {(event) => {
                            event.preventDefault();
                            register(userState)
                        }}
                    
                    >
                    <div className="form-group">
                        <div className="form-row">
                            <div className="col">
                                <label htmlFor="InputEmail">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Nombre"
                                    //El onChange hace que cada vez que tecleo lo identifica
                                    onChange={(event) => {
                                        const name = event.target.value;
                                        //El setUserState arma el objeto con el nombre del primero y los datos del segundo
                                        setUserState({...userState, ...{name}})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputEmail">Email</label>
                        <input
                            type="email"
                            className="form-control form-control-sm"
                            placeholder="Correo electrónico"
                            onChange={(event) => {
                                const email = event.target.value;
                                //El setUserState arma el objeto con el nombre del primero y los datos del segundo
                                setUserState({...userState, ...{email}})
                            }}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputPassword1">Contraseña</label>
                        <input
                            type="password"
                            className="form-control form-control-sm"
                            placeholder="Contraseña"
                            onChange={(event) => {
                                const password = event.target.value;
                                setUserState({...userState, ...{password}});
                                // console.log(userState)
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
            <Footer/>
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
        register: (userState) => {
            // dispatch()
            console.log(userState)
        }
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Register) 
