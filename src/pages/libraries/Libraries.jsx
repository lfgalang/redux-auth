import React from 'react'
import "./libraries.css"
import Header from '../../components/layout/Header'
import { Link } from 'react-router-dom'

function Libraries() {
    return (
        <div>
            <Header />
            <div className="libraries-container">
                <Link to="/libraryedit" >Modificar libreria</Link>
            </div>
        </div>
    )
}

export default Libraries
