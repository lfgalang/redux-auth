import React, { useEffect, useState } from 'react'
import './newLibForm.css'
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
// import Logo from "./Logo.png"
// import axios from 'axios';



function idGen() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}


const parser = (datos) => {
    const current = new Date();

    const rebarId = idGen();

    const userId = JSON.parse(localStorage.getItem('auth')).user.id;

    console.log(datos)
    var parsedData = {//para redefinir estructura de datos
        "info":{
            "user_id":userId,
            "rebarLibrary_id":rebarId,
            "title":datos["title"],
            "description":datos["description"],
            "date":`${current.getFullYear()}-${current.getMonth()}-${current.getDate()}T${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`,
        },
        "library":{
            "user_id":userId,
            "rebarLibrary_id":rebarId,
            "standard":datos["standard"],
            "units":{
                "length_units":datos["length_units"],
                "area_units":datos["area_units"],
                "mass_units":datos["mass_units"]
            },
            "nomenclatureDefinition":{
                "prefix":datos["prefix"],
                "suffix":datos["suffix"]
            }
        }
    } 
    return parsedData
}


const url = "http://localhost:8000/dccad/createRebarLibrary/";

const fetchToAPI = async (datos) => {
    await fetch( url,
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(datos)
        })
            .then(function(response){ return response.json(); })
            .then(function(data){ console.log(data) })
            // .then(() => history.push(`/libraryedit?rebarLibrary_id=${datos.rebarLibrary_id}`))
    
}        
        


// const url = "http://localhost:4000/libraries";




export default function NewLibForm() {


    // var datosListos;

    const { register, handleSubmit, watch, errors } = useForm()
    const [userInfo, setUserInfo] = useState();

    let history = useHistory();

    // const f = (id) => {history.push(`/libraryedit?rebarLibrary_id=${datum.info.rebarLibrary_id}`)}

    const onSubmit = async (data) => {

        setUserInfo(data)
        var datum = parser(data)

        console.log(datum)
        await fetchToAPI(datum)
        history.push(`/libraryedit?rebarLibrary_id=${datum.info.rebarLibrary_id}`)

    }

    console.log(1112)

    // const current = new Date();
    // const date = `${current.getHours()}:${current.getMinutes()} ${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  
    // console.log(date)
    

    return (
        
        <div className="containerForm">
            {/* <img src={Logo} alt="" className="logo" /> */}
            
            <h1 className="title" >Nueva librer??a</h1>
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className="field">
                    <p>
                        <label className="labelF" >T??tulo</label>
                    </p>
                    <div className="info" >
                        <input 
                            className="inputTitle" 
                            name='title'
                            placeholder='Ingrese el t??tulo de la librer??a'
                            type='text'
                            {...register('title', { required: true })}
                        />
                    </div>                    
                </div>

                <div className="field">
                    <p>
                        <label className="labelF" >Descripci??n</label>
                    </p>
                    <div className="info" >
                        <input 
                            className="inputDescription" 
                            name='description'
                            placeholder='Ingrese una descripci??n de a librer??a'
                            type='text'
                            {...register('description', { required: true })}
                        />
                    </div>                    
                </div>

                <div className="field">
                    <p>
                        <label className="labelF" >Plantilla</label>
                    </p>
                    <div className="info" >
                        <span className="unitsExposure">
                            <select className="selectUnitsExpo" {...register("standard", { required: true })}>
                                <option value="">personalizada</option>
                                <option value="NSR10">NSR-10</option>
                                <option value="MEX">MEX</option>
                                <option value="ACI">ACI</option>
                            </select>
                        </span>
                    </div>                    
                </div>

                <div className="field">
                    <p>
                        <label className="labelF" >Unidades</label>
                    </p>
                    <div className="unidades" >
                        <span className="unitLable">
                            longitud
                        </span>
                        <span className="units" >
                            <select className="selectUnits2" {...register("length_units", { required: true })}>
                                <option value="millimeter">mm</option>
                                <option value="centimeter">cm</option>
                                <option value="in">plg</option>
                            </select>
                        </span>
                    </div>
                    <div className="unidades2" >
                        <span className="unitLable">
                            ??rea
                        </span>
                        <span className="units" >
                            <select className="selectUnits2" {...register("area_units", { required: true })}>
                                <option value="millimeter**2">mm2</option>
                                <option value="centimeter**2">cm2</option>
                                <option value="in**2">plg2</option>
                            </select>
                        </span>
                    </div> 
                    <div className="unidades2" >
                        <span className="unitLable">
                            Peso / longitud
                        </span>
                        <span className="units" >
                            <select className="selectUnits2" {...register("mass_units", { required: true })}>
                                <option value="kilogram/meter">kg/m</option>
                                <option value="lb/in">lb/plg</option>
                            </select>
                        </span>
                    </div> 
                </div>

                <div className="field">
                    <p>
                        <label className="labelF" >Nomenclatura de las barras</label>
                    </p>
                    <div className="Nomenclature" >
                        <input 
                            className="inputPrefix" 
                            name='prefix'
                            placeholder='prefijo'
                            type='text'
                            {...register('prefix', { required: true })}
                        />
                        <span className="units" >
                            _ _
                        </span>
                        <span className="units" >
                            <input 
                                className="inputPrefix" 
                                name='sufix'
                                placeholder='sufijo'
                                type='text'
                                {...register('suffix', { required: true })}
                            />
                        </span>
                    </div>                    
                </div>

                
       
                <button className="boton" type="submit" >CREAR LIBRER??A</button>
            </form>
            {/* <pre>{JSON.stringify(userInfo, undefined, 2)}</pre> */}
        </div>
    )
}
