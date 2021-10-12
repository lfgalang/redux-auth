import React, { useEffect, useState } from 'react'
import "./libraryEdit.css"
import MaterialTable from 'material-table'
import Header from '../../components/layout/Header';

function LibraryEdit() {
    const url = "http://localhost:4000/libraries";

    const [data, setData] = useState([])

    const getLibraries = () => {
        fetch(url).then(resp => resp.json())
        .then(resp => setData(resp))
    }

    

    useEffect(() => {
        getLibraries()
    },[])

    // const daticos = getLibraries()
    // console.log(daticos)

    const columns = [
        {
            title:"Nomenclatura", 
            field:"Nomenclature", 
            validate: rowData => rowData.Nomenclature==='' ? { isValid: false, helperText: 'No puede estar vacio' } : true,
        },
        {
            title:"diametro", 
            field:"diameter",
            validate: rowData => rowData.diameter===undefined || rowData.diameter==="" ? "Required":true 

        },
        {title:"Area", field:"area"},
        {title:"peso", field:"weight"},
        {title:"Color del borde", field:"borderColor"},
        {title:"Color de relleno", field:"fillColor"},
    ]

    

    return (
        <div>
            <Header />
            <div className="librarires-container">
                <h2 align="center" >Edición de librerías</h2>

                <MaterialTable
                    title = "Libreria de barras" 
                    columns = {columns} 
                    data = {data}
                    options = {{actionsColumnIndex:-1, addRowPosition:"last" }}
                    editable = {{
                        // PARA CREAR NUEVAS FILAS
                        onRowAdd:(newData) => new Promise((resolve,reject) => {
                            //Backend call
                            fetch(url,{
                                method:"POST",
                                headers:{
                                    'Content-type':"application/json"
                                },
                                body:JSON.stringify(newData)
                            }).then(resp => resp.json())
                            .then(resp => {getLibraries()
                                resolve() 
                            })
                        }),
                        // PARA MODIFICAR FILAS
                        onRowUpdate: (newData, oldData) => new Promise((resolve,reject) => {
                            //Backend call
                            fetch(url+ "/" +oldData["id"],{
                                method:"PUT",
                                headers:{
                                    'Content-type':"application/json"
                                },
                                body:JSON.stringify(newData)
                            }).then(resp => resp.json())
                            .then(resp => {getLibraries()
                                resolve() 
                            })
                        }),
                        // PARA BORRAR FILAS
                        onRowDelete: (oldData) => new Promise((resolve,reject) => {
                            //Backend call
                            fetch(url+ "/" +oldData["id"],{
                                method:"DELETE",
                            }).then(resp => resp.json())
                            .then(resp => {getLibraries()
                                resolve() 
                            })
                        }),
                    }}
                />
            </div>
        </div>
        
    )
}

export default LibraryEdit

