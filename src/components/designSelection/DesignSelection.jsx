import React from 'react'
import "./designSelection.css";
import { useForm } from "react-hook-form";
import dummy from './dummy';
import "../BeamForm/beamForm.css"

const NoData = dummy();
console.log(NoData)

// const NoData = ["No.2", "No.3", "No.4", "No.5", "No.6", "No.7", "No.8", "No.9", "No.10", "No.11", "No.14", "No.18"];

export default function DesignSelection() {

    const { register, handleSubmit, watch, errors } = useForm()

    return (
        <div className="containerDS">
            <form action="">
                

                <div className="field">
                    
                    <div className="info" >
                        <span>
                            <p>
                                <label className="labelF" >Elección del diseño del refuero</label>
                            </p>
                            <p>Elija el refuerzo con que desea su diseño de viga</p>
                        </span>
                        <span className="inputSelect" >
                            <select className="selectUnitsExpo" {...register("exposureType", { required: true })}>
                                {
                                    Object.keys(NoData).map((i,k) => 
                                        <option key={k} value={String((NoData)[i])}>{((NoData)[i])}</option>
                                    )
                                    
                                }
                            </select>
                        </span>
                    </div>                    
                </div>
            </form>
            

        </div>
    )
}
