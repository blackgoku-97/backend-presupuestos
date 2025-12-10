import { Router } from "express";
import {
  listarPresupuestos,
  crearPresupuesto,
  actualizarPresupuesto,
  eliminarPresupuesto
} from "../controllers/presupuestosController";

const router = Router();

router.get("/", listarPresupuestos);
router.post("/", crearPresupuesto);
router.put("/:id", actualizarPresupuesto);
router.delete("/:id", eliminarPresupuesto);

export default router;