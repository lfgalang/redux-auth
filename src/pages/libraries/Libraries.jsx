import React, { useEffect, useState } from 'react'
import "./libraries.css"
import Header from '../../components/layout/Header'
import { Link } from 'react-router-dom'
import LibraryCard from '../../components/libraryCard/LibraryCard'
import Popform from '../../components/newLibform/NewLibForm'
import NewLibForm from '../../components/newLibform/NewLibForm'


const libs = ["lib1", "Edificio1", "Casa 4"]

function Libraries() {

    const datos = {
        "user_id": JSON.parse(localStorage.getItem('auth')).user.id
    }

    const url = "http://localhost:8000/dccad/getUserRebarLibraries/";

    const [data, setData] = useState([]);

    const fetchData = (datos) => {fetch( url,
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(datos)
            })
                .then(function(response){ return response.json(); })
                .then(function(data){ setData(() => {
                    return data['response']['libraries_listed']
                }) 
            })
        }
        
    useEffect(() => {
        console.log('dentro')
        fetchData(datos)
    }, []);


    

    // const [data, setData] = useState([])

    // // const getLibraries = () => {
    // //     fetch(url).then(resp => resp.json())
    // //     .then(resp => setData(resp))
    // // }
    // const datos = {
    //         "user_id": JSON.parse(localStorage.getItem('auth')).user.id
    //     }

    // fetch( url,
    //     {
    //         headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //         },
    //         method: "POST",
    //         body: JSON.stringify(datos)
    //     })
    //         .then(function(response){ return response.json(); })
    //         .then(function(data){ setData(() => {
    //             return data['response']['libraries_listed']
    //         }) 
    //     })

    

    // useEffect(() => {
    //     getLibraries()
    // },[])

    // const libraries = data;
    // console.log(libraries)
   

    return (
        <div>
            <Header />
            <div className="libraries" >
                <h1 className="title">Librerias</h1>
            </div>
            <div className="libraries-container">
                <div className="left">
                    <NewLibForm />
                </div>
                <div className="right">
                    <span className="forms" >
                        {data.map((l,k) => (
                            <LibraryCard library={l} key={k} />                            
                        ))}
                    </span>
                </div>
                
                
                
            </div>
        </div>
    )
}

export default Libraries
