import { Request, Response } from "express";
import { pool } from "../db";

// Listar presupuestos
export const listarPresupuestos = async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.id, p.descripcion, p.monto, p.fecha,
             c.id AS cliente_id, c.nombre AS cliente_nombre
      FROM presupuestos p
      JOIN clientes c ON p.cliente_id = c.id
      ORDER BY p.id DESC
    `);
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ message: "Error al listar presupuestos", error: err.message });
  }
};

// Crear presupuesto
export const crearPresupuesto = async (req: Request, res: Response) => {
  try {
    const { cliente_id, descripcion, monto, fecha } = req.body;
    if (!cliente_id || !descripcion || !monto) {
      return res.status(400).json({ message: "cliente_id, descripcion y monto son requeridos" });
    }

    const [result] = await pool.query(
      "INSERT INTO presupuestos (cliente_id, descripcion, monto, fecha) VALUES (?, ?, ?, ?)",
      [cliente_id, descripcion, monto, fecha ?? null]
    );

    res.status(201).json({ id: (result as any).insertId, cliente_id, descripcion, monto, fecha });
  } catch (err: any) {
    res.status(500).json({ message: "Error al crear presupuesto", error: err.message });
  }
};

// Actualizar presupuesto
export const actualizarPresupuesto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cliente_id, descripcion, monto, fecha } = req.body;

    const [result] = await pool.query(
      "UPDATE presupuestos SET cliente_id = ?, descripcion = ?, monto = ?, fecha = ? WHERE id = ?",
      [cliente_id, descripcion, monto, fecha ?? null, id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "Presupuesto no encontrado" });
    }

    res.json({ id, cliente_id, descripcion, monto, fecha });
  } catch (err: any) {
    res.status(500).json({ message: "Error al actualizar presupuesto", error: err.message });
  }
};

// Eliminar presupuesto
export const eliminarPresupuesto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM presupuestos WHERE id = ?", [id]);

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "Presupuesto no encontrado" });
    }

    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ message: "Error al eliminar presupuesto", error: err.message });
  }
};