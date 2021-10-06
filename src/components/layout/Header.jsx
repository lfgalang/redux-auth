import React from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { LogoutAuthAction } from '../../redux/actions/AuthAction';

function Header(props) {

    const { auth, logout } = props //Acá queda almacenado el estado del usuario
    const history = useHistory();

    return (
        <div className="header d-flex justify-content-center py-2 shadow-sm">
            <Link to="/" >
                <h5 className="font-weight-bold text-dark mx-3 pt-1">Diseño de Soluciones</h5>
            </Link>
            <div className="ml-auto d-flex">
                {!auth.isLoggedIn ? (
                    <React.Fragment>
                        <Link to="./login" >
                            <button className="btn btn-danger btn-sm mr-2">Login</button>
                        </Link>
                        
                        <Link to="./signup">
                            <button className="btn btn-danger btn-sm mr-5">Sign up</button>
                        </Link>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <h5 className="pr-2 mt-1" >{auth.user.username}</h5>
                        <Link to="./login">
                            <button 
                                className="btn btn-danger btn-sm mr-2"
                                onClick = {() => {logout(history)}}
                            >Logout</button>
                        </Link>
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (history) => {
            dispatch(LogoutAuthAction(history))
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Header);
