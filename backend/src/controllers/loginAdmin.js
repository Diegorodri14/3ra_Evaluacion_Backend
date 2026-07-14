import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import { config } from "../../config.js";

import adminModel from "../models/admin.js";

const loginAdminController = {};

loginAdminController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEncontrado = await adminModel.findOne({ email });

    if (!adminEncontrado) {
      return res.status(400).json({ message: "admin no encontrado" });
    }

    if (adminEncontrado.timeOut && adminEncontrado.timeOut > Date.now()) {
      return res.status(403).json({ message: "Su cuenta esta bloqueada" });
    }

    const isMatch = await bcrypt.compare(password, adminEncontrado.password);

    if (!isMatch) {
      adminEncontrado.loginAttemps = adminEncontrado.loginAttemps(10) + 1;
      return res.status(401).json({ message: "Contrasena Incorrecta" });
    }

    if (adminEncontrado.loginAttemps >= 5) {
      adminEncontrado.timeOut = Date.now() + 5 * 60 * 1000;
      adminEncontrado.loginAttemps = 0;

      return res.status(400).json({
        message: "Su cuenta ha sido bloqueada por muchos intentos fallidos",
      });
    }

    await adminEncontrado.save();

    adminEncontrado.loginAttemps = 0;
    adminEncontrado.timeOut = null;

    const token = jsonwebtoken.sign(
      { id: adminEncontrado.id, userType: "admin" },
      config.JWT.secret,
      { expiresIn: "30d" },
    );

    res.cookie("authCookie", token);

    return res.status(200).json({ message: "Login Exitoso" });
  } catch (error) {
    console.log(error + "error");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default loginAdminController