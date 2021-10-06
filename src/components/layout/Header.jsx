import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className="header d-flex justify-content-center py-2 shadow-sm">
            <Link to="/" >
                <h5 className="font-weight-bold text-dark mx-3">Diseño de Soluciones</h5>
            </Link>
            <div className="ml-auto">
                <Link to="./login" >
                    <button className="btn btn-danger btn-sm mr-2">Login</button>
                </Link>
                
                <Link to="./signup">
                    <button className="btn btn-danger btn-sm mr-5">Sign up</button>
                </Link>
                <Link to="./login">
                    <button className="btn btn-danger btn-sm mr-2">Logout</button>
                </Link>
                
            </div>
        </div>
    )
}

export default Header
