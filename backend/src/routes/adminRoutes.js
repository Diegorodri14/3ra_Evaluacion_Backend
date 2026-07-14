import express from "express"
import registerControllerAdmin from "../controllers/registrarAdministrador.js"
import loginAdministradorController from "../controllers/loginAdmin.js";

const router = express.Router()

router.route("/register")
.post(registerControllerAdmin.register);

router.route("/verifyCode")
.post(registerControllerAdmin.verifyCode);

router.route("/login")
.post(loginAdministradorController.login)

export default router