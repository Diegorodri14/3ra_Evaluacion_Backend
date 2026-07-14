import express from "express"
import clienteRoutes from "./src/routes/clienteRoutes.js"

import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/cliente", clienteRoutes)

export default app;