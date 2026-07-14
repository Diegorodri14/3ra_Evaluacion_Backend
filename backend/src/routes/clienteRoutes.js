import express from "express"
import registrarCliente from "../controllers/registrarCliente.js"
import loginClienteController from "../controllers/loginCliente.js";

const router = express.Router()

router.route("/register")
.post(registrarCliente.register);

router.route("/verifyCode")
.post(registrarCliente.verifyCode);

router.route("/login")
.post(loginClienteController.login)

export default router