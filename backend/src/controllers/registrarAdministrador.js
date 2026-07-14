import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import modelAdmin from "../models/Admin.js";

import { config } from "../../config.js";
import { register } from "module";
import { text } from "stream/consumers";
import { info } from "console";

const registerControllerAdmin = {};

registerControllerAdmin.register = async (req, res) => {
  try {
    const { name, email, password, isVerified, loginAttemps, timeOut } =
      req.body;

    const adminExistente = await modelAdmin.findOne({ email });

    if (adminExistente) {
      return res.status(400).json({ message: "El correo ingresado ya existe" });
    }

    const passwordHashed = await bcryptjs.hash(password, 10);

    const randomCode = crypto.randomBytes(3).toString("hex");

    const token = jsonwebtoken.sign(
      {
        name,
        email,
        password: passwordHashed,
        isVerified,
        loginAttemps,
        timeOut,
      },

      config.JWT.secret,
      { expiresIn: "15m" },
    );

    res.cookie("registrationCookie", token, { maxAge: 15 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        password: config.email.user_password,
      },
    });

    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Verificacion de cuenta",
      text:
        "Para verificar que su cuenta realmente existe introduce este codigo " +
        randomCode +
        " para continuar la sesion",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
        return res.status(500).json({ message: "Error al enviar el correo" });
      }
      return res.status(200).json({ message: "Correo enviado" });
    });
  } catch (error) {
    console.log(error + "error");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

registerControllerAdmin.verifyCode = async (req, res) => {
  try {
    const { verifitacionCodeRequest } = req.body;
    const token = req.cookies.registrationCookie;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    const {
      randomCode: storedCode,
      name,
      email,
      password,
      isVerified,
      loginAttemps,
      timeOut,
    } = decoded;

    if (verifitacionCodeRequest !== storedCode) {
      return res.status(400).json({ message: "Codigo Invalido" });
    }

    const nuevoAdmin = modelAdmin({
      name,
      email,
      password,
      isVerified: true,
    });

    await nuevoAdmin.save();

    res.clearCookie("registrationCookie");

    return res.status(200).json({ message: "Admin Registrado" });
  } catch (error) {
    console.log(error + "error");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default registerControllerAdmin;