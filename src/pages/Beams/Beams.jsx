import React from 'react'
import BeamDraw from '../../components/beamDraw/BeamDraw'
import BeamForm from '../../components/BeamForm/BeamForm'
import DesignSelection from '../../components/designSelection/DesignSelection'
import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
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