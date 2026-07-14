import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import { config } from "../../config.js";

import clienteModel from "../models/Cliente.js";

const loginClienteController = {};

loginClienteController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const clienteEncontrado = await clienteModel.findOne({ email });

    if (!clienteEncontrado) {
      return res.status(400).json({ message: "Cliente no encontrado" });
    }

    if (clienteEncontrado.timeOut && clienteEncontrado.timeOut > Date.now()) {
      return res.status(403).json({ message: "Su cuenta esta bloqueada" });
    }

    const isMatch = await bcrypt.compare(password, clienteEncontrado.password);

    if (!isMatch) {
      clienteEncontrado.loginAttemps = clienteEncontrado.loginAttemps(10) + 1;
      return res.status(401).json({ message: "Contrasena Incorrecta" });
    }

    if (clienteEncontrado.loginAttemps >= 5) {
      clienteEncontrado.timeOut = Date.now() + 5 * 60 * 1000;
      clienteEncontrado.loginAttemps = 0;

      return res.status(400).json({
        message: "Su cuenta ha sido bloqueada por muchos intentos fallidos",
      });
    }

    await clienteEncontrado.save();

    clienteEncontrado.loginAttemps = 0;
    clienteEncontrado.timeOut = null;

    const token = jsonwebtoken.sign(
      { id: clienteEncontrado.id, useType: "cliente" },
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

export default loginClienteController