/*
    customerId,
    quantity,
    purchaseDate,
    total,
    transactionId
*/

import mongoose, { Schema, model } from "mongoose";

const boletoSchema = new Schema({
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: "clientes",
  },

  quantity: {
    type: Number,
  },

  purchaseDate: {
    type: Date,
  },

  total: {
    type: Number,
  },

  transactionId: {
    type: String
  },
});

export default model("boletos", boletoSchema)