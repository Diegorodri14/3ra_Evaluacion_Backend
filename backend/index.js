import app from "./app.js"
import "./database.js"

async function main(params) {
    app.listen(4000)
    console.log("Servidor en el puerto 4000")
}

main();