import React from 'react'



const parser = (datos) => {
    console.log(datos)
    var parsedData = Object.keys(datos); //para redefinir estructura de datos

    // Object.keys(datos).forEach(i => {
    //     parsedData[i] = (Object.keys(datos)[i]),
    //     console.log((Object.keys(datos)[i]))
    // })
    console.log(parsedData)
    return parsedData
};

const obj = {
    "quantity": {
        "No.4 , No.6 , 0": {
        "No.4": 10
        },
        "No.4 , No.6 , 1": {
        "No.4": 8,
        "No.6": 1
        },
        "No.4 , No.6 , 2": {
        "No.4": 6,
        "No.6": 2
        },
        "No.4 , No.6 , 3": {
        "No.4": 3,
        "No.6": 3
        },
        "No.4 , No.6 , 4": {
        "No.4": 1,
        "No.6": 4
        },
        "No.4 , No.7 , 1": {
        "No.4": 7,
        "No.7": 1
        },
        "No.4 , No.7 , 2": {
        "No.4": 4,
        "No.7": 2
        },
        "No.4 , No.7 , 3": {
        "No.4": 1,
        "No.7": 3
        },
        "No.6 , No.7 , 0": {
        "No.6": 5
        },
        "No.6 , No.7 , 1": {
        "No.6": 3,
        "No.7": 1
        },
        "No.6 , No.7 , 2": {
        "No.6": 2,
        "No.7": 2
        },
        "No.6 , No.7 , 3": {
        "No.6": 1,
        "No.7": 3
        },
        "No.6 , No.14 , 1": {
        "No.6": 0,
        "No.14": 1
        },
        "No.7 , No.14 , 0": {
        "No.7": 4
        },
        "No.7 , No.14 , 1": {
        "No.7": 0,
        "No.14": 1
        },
        "No.14": {
        "No.14": 1
        }
    },
}

const NoData = ["No.2", "No.3", "No.4", "No.5", "No.6", "No.7", "No.8", "No.9", "No.10", "No.11", "No.14", "No.18"];


export default function dummy() {
    return (
        parser(obj.quantity)
        // NoData
    )
}