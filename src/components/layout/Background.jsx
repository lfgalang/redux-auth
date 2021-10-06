import React from 'react'

function Background() {
    return (
        <div className="home-main">
            <form action="" className="d-flex justify-content-center">
                <div className="form-group m-0">
                    <input 
                        type="text" 
                        className="form-control search-form-control" 
                        placeholder="Entra a la matrix"
                    />
                </div>
                <button type="submit" className="ml-2 btn btn-danger btn-sm">
                    Search
                </button>
            </form>
        </div>
    )
}

export default Background
