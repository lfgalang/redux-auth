import React, { useEffect, useState } from 'react'
import "./libraryEdit.css"
import MaterialTable, {MTableToolbar} from 'material-table'
import Header from '../../components/layout/Header';
import { Button } from '@material-ui/core';

function LibraryEdit() {


    const urlp = window.location.href
    console.log(urlp)

    var url2 = new URL(urlp);
    var rebarLibrary_id = url2.searchParams.get("rebarLibrary_id");
    // console.log(c);


    // const url = "http://localhost:4000/libraries";

    // const [data, setData] = useState([])


    const datos = {
        "user_id": JSON.parse(localStorage.getItem('auth')).user.id,
        "rebarLibrary_id": rebarLibrary_id.toString()
    }
    const url = "http://localhost:8000/dccad/getUserRebarLibrary/";

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
                .then(function(datas){ setData(() => {
                    return datas['response']['data']
                }) 
            })
        }
        
    useEffect(() => {
        console.log('dentro')
        fetchData(datos)
    }, []);




    // const getLibraries = () => {
    //     fetch(url).then(resp => resp.json())
    //     .then(resp => setData(resp))
    // }

    // useEffect(() => {
    //     getLibraries()
    // },[])

    // const daticos = getLibraries()
    console.log(data)

    const columns = [
        {
            title:"Nomenclatura", 
            field:"nomenclature", 
            validate: rowData => rowData.nomenclature==='' ? { isValid: false, helperText: 'No puede estar vacio' } : true,
        },
        {
            title:"diametro", 
            field:"diameter",
            validate: rowData => rowData.diameter===undefined || rowData.diameter==="" ? "Required":true 

        },
        {title:"Area", field:"area"},
        {title:"peso", field:"mass"},
        {title:"Color del borde", field:"borderColor", /*lookup:{"rgb1":"red", "rgb2":"black" }*/ },
        {title:"Color de relleno", field:"fillColor", /*lookup:{"rgb1":"red", "rgb2":"black" }*/},
    ]

    

    return (
        <div>
            <Header />
            <div className="librarires-container">
                <h2 align="center" >Edición de librerías</h2>

                <MaterialTable
                    title = "Libreria de barras" 
                    className = "fila"
                    columns = {columns} 
                    data = {data}
                    options = {{
                        actionsColumnIndex:-1, 
                        addRowPosition:"last",
                        // rowStyle: {backgroundColor:"grey", color:"white", height:"100px", border:"solid black" }
                    }}
                    
                    editable = {{
                        // // PARA CREAR NUEVAS FILAS
                        // onRowAdd:(newData) => new Promise((resolve,reject) => {
                        //     //Backend call
                        //     fetch(url,{
                        //         method:"POST",
                        //         headers:{
                        //             'Content-type':"application/json"
                        //         },
                        //         body:JSON.stringify(newData)
                        //     }).then(resp => resp.json())
                        //     .then(resp => {getLibraries()
                        //         resolve() 
                        //     })
                        // }),
                        // // PARA MODIFICAR FILAS
                        // onRowUpdate: (newData, oldData) => new Promise((resolve,reject) => {
                        //     //Backend call
                        //     fetch(url+ "/" +oldData["id"],{
                        //         method:"PUT",
                        //         headers:{
                        //             'Content-type':"application/json"
                        //         },
                        //         body:JSON.stringify(newData)
                        //     }).then(resp => resp.json())
                        //     .then(resp => {getLibraries()
                        //         resolve() 
                        //     })
                        // }),
                        // // PARA BORRAR FILAS
                        // onRowDelete: (oldData) => new Promise((resolve,reject) => {
                        //     //Backend call
                        //     fetch(url+ "/" +oldData["id"],{
                        //         method:"DELETE",
                        //     }).then(resp => resp.json())
                        //     .then(resp => {getLibraries()
                        //         resolve() 
                        //     })
                        // }),
                    }}
                />
            </div>
        </div>
        
    )
}

export default LibraryEdit

