import express from "express"
import boletosController from "../controllers/boletosController.js"
import { validateAuthCookie } from "../middlewares/ValidateAuth.js"

const router = express.Router()

router.route("/")
.get(validateAuthCookie(["cliente"]), boletosController.obtenerBoletos)
.post(validateAuthCookie(["admin"]), boletosController.agregarBoleto);

router.route("/:id")
.put(validateAuthCookie(["admin",]), boletosController.actualizarBoleto)
.delete(validateAuthCookie(["admin"]), boletosController.eliminarBoleto);

export default router