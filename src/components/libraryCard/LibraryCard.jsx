import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom'
import "./libraryCard.css"






function LibraryCard({library}) {

    let history = useHistory();

    const { register, handleSubmit, watch, errors } = useForm()
    const [libraryInfo, setLibraryInfo] = useState();



    const onSubmit = (data) => {
        setLibraryInfo(data)
        history.push(`/libraryedit?rebarLibrary_id=${data.rebarLibrary_id}`)
        // fetchToAPI(datum)

        console.log(data.rebarLibrary_id)

        const datos = {
            "user_id": JSON.parse(localStorage.getItem('auth')).user.id,
            "rebarLibrary_id":data["rebarLibrary_id"]
        }
    
        const url = "http://localhost:8000/dccad/getUserRebarLibrary/";
    
        // const [data, setData] = useState([]);
    
        fetch( url,
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(datos)
            })
                .then(function(response){ return response.json(); })
                .then(function(datum){ console.log(datum['response']['data']) })
            
        // useEffect(() => {
        //     fetchData(datos)
        // }, []);

    }




    return (
            // <Link to="/libraryedit" >
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="cardContainer">
                    {/* <Link to="/libraryedit" > */}
                    <button className="cardButton" type="submit" >
                        
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
                        
                            <div className="units" >
                                <select className="selectUnits" {...register("rebarLibrary_id", { required: true })}>
                                    <option value={library.rebarLibrary_id}></option>
                                </select>
                            </div>
                            
                                             
                    </div>
                    </button>
                    {/* </Link> */}
                </div>   
            </form>       
            
        
        
    )
}

export default LibraryCard
