import express from "express"
import clienteRoutes from "./src/routes/clienteRoutes.js"
import adminRoutes from "./src/routes/adminRoutes.js"
import wompiRoutes from "./src/routes/wompiRoutes.js";
import boletosRoutes from "./src/routes/boletosRoutes.js"

import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/cliente", clienteRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/wompi", wompiRoutes)
app.use("/api/boleto", boletosRoutes)

export default app;