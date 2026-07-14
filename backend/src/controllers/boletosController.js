import { deleteModel } from "mongoose";
import boletosModel from "../models/boletos.js";

const boletosController = {};

//SELECT
boletosController.obtenerBoletos = async (req, res) => {
  try {
    const boletos = await boletosModel.find();
    return res.status(200).json(boletos);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//INSERT
boletosController.agregarBoleto = async (req, res) => {
  try {
    const { customerId, quantity, purchaseDate, total, transactionId } =
      req.body;

    const nuevoBoleto = new boletosModel({
      customerId,
      quantity,
      purchaseDate,
      total,
      transactionId,
    });

    await nuevoBoleto.save();

    return res.status(200).json({ message: "El bolteo ha sido agregado" });
  } catch (error) {
    console.log(error + "error");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//UPDATE
boletosController.actualizarBoleto = async (req, res) => {
  try {
    const { customerId, quantity, purchaseDate, total, transactionId } =
      req.body;

    const boletoActualizado = await boletosModel.findByIdAndUpdate(
      req.params.id,
      {
        customerId,
        quantity,
        purchaseDate,
        total,
        transactionId,
      },
      { new: true },
    );

    if (!boletoActualizado) {
      return res.status(404).json({ message: "Boleto no encontrado" });
    }

    res.status(200).json({ message: "Boleto actualizado" });
  } catch (error) {
    console.log(error + "error");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//ELIMINAR
boletosController.eliminarBoleto = async (req, res) => {
  try {
    const boletoEliminado = boletosModel.findByIdAndDelete(req.params.id);

    if (!boletoEliminado) {
      return res.status(404).json({ message: "El boleto no fue encontrado" });
    }

    return res
      .status(200)
      .json({ message: "El boleto se ha eliminado correctamente" });
  } catch (error) {
    console.log(error + "error");
    return res.status(500).json({ message: " Internal Server Error" });
  }
};

export default boletosController