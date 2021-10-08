import React from 'react'
import BeamDraw from '../beamDraw/BeamDraw'
import BeamForm from '../BeamForm/BeamForm'
import DesignSelection from '../designSelection/DesignSelection'
import Footer from '../layout/Footer'
import Header from '../layout/Header'
import "./beams.css"

function Beams() {
    return (
        <div>
            <Header />
            <div className="fondoB" >
                <span className="left" >
                    <BeamForm />                    
                </span>
                <span className="rigth">
                    <DesignSelection />
                    <BeamDraw />
                </span>            
            </div>
            <Footer/>
        </div>
    )
}

export default Beams