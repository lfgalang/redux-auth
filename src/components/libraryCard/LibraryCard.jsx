import React from 'react'
import { Link } from 'react-router-dom'
import "./libraryCard.css"

function LibraryCard({library}) {
    return (
        <Link to="/libraryedit" >
            <div className="cardContainer">
                <div className="card">
                        <div className="circle">
                            <h2 className="libButton">{library.title}</h2>
                            <hr />
                            <div >
                                <p className="date">{library.date}</p>
                            </div>
                        </div> 
                        <div className="content" >
                            <p className="libDesc">{library.description}</p>
                        </div>
                        <hr />
                    
                </div>
            </div>
            
        </Link>
    )
}

export default LibraryCard
