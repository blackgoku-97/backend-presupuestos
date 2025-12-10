import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import clientesRouter from "./routes/clientes";
import presupuestosRouter from "./routes/presupuestos";
import { pool } from "./db";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ status: "ok", db: (rows as any)[0].ok === 1 });
  } catch (err: any) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

app.use("/clientes", clientesRouter);
app.use("/presupuestos", presupuestosRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API escuchando en http://localhost:${port}`));