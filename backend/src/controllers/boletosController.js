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
