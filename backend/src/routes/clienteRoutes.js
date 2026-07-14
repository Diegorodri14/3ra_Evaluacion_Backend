import express from "express"
import registrarCliente from "../controllers/registrarCliente.js"

const router = express.Router()

router.route("/register")
.post(registrarCliente.register);

router.route("/verifyCode")
.post(registrarCliente.verifyCode);

export default router