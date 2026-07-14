import mongoose from "mongoose"
import {config} from "./config.js"

mongoose.connect(config.DB.DB_URL)

const connection = mongoose.connection

connection.once("open", ()=> {
    console.log("Base de datos encendida")
})

connection.on("disconnect", ()=> {
    console.log("Base de datos apagada")
})

connection.on("error", (error)=> {
    console.log("Error en la conexion de la base de datos")
})
