import React, { useState } from 'react'
import './beamForm.css'
import { useForm } from "react-hook-form";
// import Logo from "./Logo.png"
// import axios from 'axios';

const parser = (datos, dataDepth) => {

    console.log(datos)

    var parsedData = {} //para redefinir estructura de datos

    Object.keys(datos).forEach(k => {

        if (dataDepth.includes(k)) {
            parsedData[k] = {
                'value': parseFloat(datos[k]),
                'unit': datos[k+'_units']
            }
        }else if(k === "nomenclatureOptions"){
            parsedData[k] = datos[k]   
        }else{
            if (typeof datos[k] === "boolean"){
                if (datos[k] === true){
                    console.log(k) // No
                    if (k==="No" || k==="mm" || k==="plg"){
                        console.log(datos[k]) // true
                        
                        parsedData['nomenclatureType'] = k
                    }
                }
            }  else if (!!~k.indexOf("_units") === false){
                parsedData[k] = datos[k]
            }             
        }
        datos["exposureType"] = parseFloat(datos["exposureType"])
    })
    return parsedData
}


const fetchToAPI = (datos) => {

    const api_url = 'http://localhost:8000/'

    datos['stirrupNomenclature'] = 'No.3'

    fetch( api_url + "dccad/calculateAutoBeam/",
        {
            // mode: 'cors',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // 'Access-Control-Allow-Origin': '*'
            },
            method: "POST",
            body: JSON.stringify(datos)
        })
            .then(function(response){ return response.json(); })
            .then(function(data){ console.log(data) })
}


const NoData = ["No.2", "No.3", "No.4", "No.5", "No.6", "No.7", "No.8", "No.9", "No.10", "No.11", "No.14", "No.18"];
const mmData = ["6.4 mm", "9.5 mm", "12.7 mm", "15.9 mm", "19.1 mm", "22.2 mm", "25.4 mm", "28.7 mm", "32.3 mm", "35.8 mm", "43.0 mm", "57.3 mm"]
const plgData = [`1/4"`, `3/8"`, `1/2"`, `5/8"`, `3/4"`, `7/8"`, `1"`, `1-1/8"`, `1-1/4"`, `1-3/8"`, `1-3/4"`, `2-1/4"`]

// const modDis = ["CANTIDAD", "AUTOM??TICO", "DISTANCIA"]


export default function BeamForm() {

    // var datosListos;

    const { register, handleSubmit, watch, errors } = useForm()
    const [userInfo, setUserInfo] = useState();

    const onSubmit = (data) => {
        setUserInfo(data)
        var datum = parser(data,  ['momentU', 'width', 'height', 'fy', 'fpc', 'maxNomenclatureDistance', 'spaceMin'])

        console.log(datum)
        fetchToAPI(datum)
    }

    // console.log(datosListos)

    var No = Boolean(false);
    var mm = Boolean(false);
    var plg = Boolean(false);    
    switch (watch("nomenclatureType")){
        case "No":
            No = Boolean(true)
        break;
        case "mm":
            mm = Boolean(true);
        break
        case "plg":
            plg = Boolean(true)
        break
        default:
            console.log("no elecci??n de nomenclatura")
    }

    var auto = Boolean(false);
    var quantity = Boolean(false);
    var space = Boolean(false);
    switch (watch("sectionRebarCalculationType")){
        case "Auto":
            auto = Boolean(true)
            console.log(watch("sectionRebarCalculationType"))
        break;
        case "Quantity":
            quantity = Boolean(true);
            console.log(watch("sectionRebarCalculationType"))
        break
        case "Space":
            space = Boolean(true)
            console.log(watch("sectionRebarCalculationType"))
        break
        default:
            console.log("no elecci??n de modalidad de dise??o")
    }

    return (
        
        <div className="containerBeamForm">
            {/* <img src={Logo} alt="" className="logo" /> */}
            
            <h1 className="title" >Ingreso de datos</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="field">
                    <p>
                        <label className="labelF" >Momento</label>
                    </p>
                    <div className="info" >
                        <input 
                            className="input" 
                            name='momentU'
                            placeholder='Ingrese el momento requerido'
                            type='number'
                            step="0.001"
                            {...register('momentU', { required: true })}
                        />
                        <span className="units" >
                            <select className="selectUnits" {...register("momentU_units", { required: true })}>
                                <option value="kJ">kN-m</option>
                                <option value="J">J</option>
                                <option value="kN*m">kN-m</option>
                            </select>
                        </span>
                    </div>                    
                </div>
                <div className="field">
                    <p>
                        <label className="labelF" >base de la viga</label>
                    </p>
                    <div className="info" >
                        <input 
                            className="input" 
                            name='width'
                            placeholder='Ingrese la base de la viga'
                            type='number'
                            step="0.001"
                            {...register('width', { required: true })}
                        />
                        <span className="units" >
                            <select className="selectUnits" {...register("width_units", { required: true })}>
                                <option value="m">m</option>
                                <option value="cm">cm</option>
                                <option value="mm">mm</option>
                            </select>
                        </span>
                    </div>                    
                </div>
                <div className="field">
                    <p>
                        <label className="labelF" >Altura de la viga</label>
                    </p>
                    <div className="info" >
                        <input 
                            className="input" 
                            name='height'
                            placeholder='Ingrese la altura de la viga'
                            type='number'
                            step="0.001"
                            {...register('height', { required: true })}
                        />
                        <span className="units" >
                            <select className="selectUnits" {...register("height_units", { required: true })}>
                                <option value="m">m</option>
                                <option value="cm">cm</option>
                                <option value="mm">mm</option>
                            </select>
                        </span>
                    </div>                    
                </div>
                <div className="field">
                    <p>
                        <label className="labelF" >Esfuerzo de fluencia del acero (fy)</label>
                    </p>
                    <div className="info" >
                        <input 
                            className="input" 
                            name='fy'
                            placeholder='Ingrese el fy del acero'
                            type='number'
                            step="0.001"
                            {...register('fy', { required: true })}
                        />
                        <span className="units" >
                            <select className="selectUnits" {...register("fy_units", { required: true })}>
                                <option value="MPa">MPa</option>
                                <option value="psi">psi</option>
                            </select>
                        </span>
                    </div>                    
                </div>
                <div className="field">
                    <p>
                        <label className="labelF" >Resistencia del Concreto (f'c)</label>
                    </p>
                    <div className="info" >
                        <input 
                            className="input" 
                            name='fpc'
                            placeholder='Ingrese la resistencia del concreto'
                            type='number'
                            step="0.001"
                            {...register('fpc', { required: true })}
                        />
                        <span className="units" >
                            <select className="selectUnits" {...register("fpc_units", { required: true })}>
                                <option value="MPa">MPa</option>
                                <option value="psi">psi</option>
                            </select>
                        </span>
                    </div>                    
                </div>
                <div className="field">
                    <p>
                        <label className="labelF" >Tipo de exposici??n de la viga</label>
                    </p>
                    <div className="info" >
                        <span className="inputSelect" >
                            <select className="selectUnitsExpo" {...register("exposureType", { required: true })}>
                                <option value="1">Concreto de cimentaci??n</option>
                                <option value="2">Expuesto a la intemperie</option>
                                <option value="3">Vigas no expuestas</option>
                            </select>
                        </span>
                    </div>                    
                </div>
                <div className="field">
                    <p>
                        <label className="labelF" >Norma</label>
                    </p>
                    <div className="info" >
                        <span className="unitsExposure">
                            <select className="selectUnitsExpo" {...register("standard", { required: true })}>
                                <option value="NSR10">NSR-10</option>
                                {/* <option value="2">MEX</option>
                                <option value="3">ACI</option> */}
                            </select>
                        </span>
                    </div>                    
                </div>

                <div className="field">
                    <p>
                        <label className="labelF" >Capacidad de disipaci??n de energ??a</label>
                    </p>
                    <div className="info" >
                        <span className="unitsExposure">
                            <select className="selectUnitsExpo" {...register("ED", { required: true })}>
                                <option value="DES">DES</option>
                                <option value="DMO">DMO</option>
                                {/* <option value="2">MEX</option>
                                <option value="3">ACI</option> */}
                            </select>
                        </span>
                    </div>                    
                </div>

                
                
                
                <div className="field">
                    <div>
                        <label htmlFor="" className="labelF">Tipo de nomenclatura</label>
                    </div>                
                    <span>
                        <label htmlFor="No"  className="labelCheck">N??</label>
                        <input type="radio" name="No" value="No" {...register('nomenclatureType', { required: false })} />
                    </span>
                    <span>
                        <label  className="labelCheck">mm</label>
                        <input type="radio" name="mm" value="mm" {...register('nomenclatureType', { required: false })} />
                    </span>
                    <span>
                        <label  className="labelCheck">plg</label>
                        <input type="radio" name="plg" value="plg" {...register('nomenclatureType', { required: false })} />
                    </span>
                    
                    <span className="NomSelector">
                        {
                            No && (
                                <div className="fieldNom" >
                                    <fieldset className="fieldsetF" style={{float: 'down'}}>
                                        <legend className="diamDis" >Diametros para el dise??o</legend>
                                        {
                                            NoData.map( (c,i) => 
                                                <label key={c} className="diam" >
                                                    <input 
                                                        className="check"
                                                        type="checkbox" 
                                                        value={c} 
                                                        name="No" 
                                                        {...register('nomenclatureOptions', { required: false })}
                                                    />{c}
                                                </label>
                                            )
                                        }
                                    </fieldset>
                                </div>
                            )
                        }{
                            mm && (
                                <div className="fieldNom" >
                                    <fieldset style={{float: 'down'}}>
                                    <legend className="diamDis" >Diametros para el dise??o</legend>
                                        {
                                            mmData.map( (c,i) => 
                                                <label key={c} className="diam" >
                                                    <input 
                                                        className="check"
                                                        type="checkbox" 
                                                        value={c} 
                                                        name="No" 
                                                        {...register('nomenclatureOptions', { required: false })}
                                                    />{c}
                                                </label>
                                            )
                                        }
                                    </fieldset>
                                </div>
                            )
                        }{
                            plg && (
                                <div className="fieldNom" >
                                    <fieldset style={{float: 'down'}}>
                                        <legend className="diamDis" >Diametros para el dise??o</legend>
                                        {
                                            plgData.map( (c,i) => 
                                                <label key={c} className="diam" >
                                                    <input 
                                                        className="check"
                                                        type="checkbox" 
                                                        value={c} 
                                                        name="No" 
                                                        {...register('nomenclatureOptions', { required: false })}
                                                    />{c}
                                                </label>
                                            )
                                        }
                                    </fieldset>
                                </div>
                            )
                        }
                    </span>    

                    <div className="field">
                        <p>
                            <label className="labelF" >Diferencia entre di??metros de la misma secci??n</label>
                        </p>
                        <div className="info" >
                            <input 
                                className="input" 
                                name='maxNomenclatureDistance'
                                placeholder='Ingrese la diferencia entre di??metros'
                                type='number'
                                step="0.001"
                                {...register('maxNomenclatureDistance', { required: true })}
                            />
                            <span className="units" >
                                <select className="selectUnits" {...register("maxNomenclatureDistance_units", { required: true })}>
                                    <option value="mm">mm</option>
                                    <option value="No">N??</option>
                                    <option value="plg">plg</option>
                                </select>
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <div>
                            <label htmlFor="" className="labelF">Modalidad de dise??o</label>
                        </div>
                        <div className="sectionRebarCalculationType">
                            <label htmlFor="No"  className="labelCheck">Dise??o Autom??tico</label>
                            <input className="radio" type="radio" name="Auto" value="0" {...register('sectionRebarCalculationType', { required: false })} />
                        </div>
                        <div className="sectionRebarCalculationType">
                            <label  className="labelCheck">Dise??o por cantidad</label>
                            <input type="radio" name="Quantity" value="1" {...register('sectionRebarCalculationType', { required: false })} />
                        </div>
                        <div className="sectionRebarCalculationType">
                            <label  className="labelCheck">Dise??o por espaciamiento</label>
                            <input type="radio" name="Space" value="2" {...register('sectionRebarCalculationType', { required: false })} />
                       
                        </div>
                    </div>
                    {
                        quantity && (
                            <p>Dise??o por cantidad</p>
                        )
                    }{
                        space && (
                            <div className="field">
                                <p>
                                    <label className="labelF" >Distancia m??nima libre entre barras</label>
                                </p>
                                <div className="info" >
                                    <input 
                                        className="input" 
                                        name='spaceMin'
                                        placeholder='Ingrese la distancia m??nima'
                                        type='number'
                                        step="0.001"
                                        {...register('spaceMin', { required: true })}
                                    />
                                    <span className="units" >
                                        <select className="selectUnits" {...register("spaceMin_units", { required: true })}>
                                            <option value="mm">mm</option>
                                            <option value="cm">cm</option>
                                            <option value="plg">plg</option>
                                        </select>
                                    </span>
                                </div>
                            
                                <p>
                                    <label className="labelF" >Distancia m??xima libre entre barras</label>
                                </p>
                                <div className="info" >
                                    <input 
                                        className="input" 
                                        name='spaceMax'
                                        placeholder='Ingrese la distancia m??xima'
                                        type='number'
                                        step="0.001"
                                        {...register('spaceMax', { required: true })}
                                    />
                                    <span className="units" >
                                        <select className="selectUnits" {...register("spaceMax_units", { required: true })}>
                                            <option value="mm">mm</option>
                                            <option value="cm">cm</option>
                                            <option value="plg">plg</option>
                                        </select>
                                    </span>
                                </div>
                            </div>
                            
                        )
                    }
                    <div className="field">
                        <div>
                            <label htmlFor="" className="labelF">Habilitar dise??o de multiples filas</label>
                            <input className="checkMulti" type="checkbox" name="true" value="true" {...register('multiRow', { required: false })} />
                        </div>
                    </div>

                    
                </div>           
                <button className="boton" type="submit" >ENVIAR</button>
            </form>
            {/* <pre>{JSON.stringify(userInfo, undefined, 2)}</pre> */}
        </div>
    )
}
