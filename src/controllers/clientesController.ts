import { Request, Response } from "express";
import { pool } from "../db";

// Listar clientes
export const listarClientes = async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clientes ORDER BY id DESC");
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ message: "Error al listar clientes", error: err.message });
  }
};

// Crear cliente
export const crearCliente = async (req: Request, res: Response) => {
  try {
    const { nombre, correo, telefono } = req.body;
    if (!nombre) return res.status(400).json({ message: "nombre es requerido" });

    const [result] = await pool.query(
      "INSERT INTO clientes (nombre, correo, telefono) VALUES (?, ?, ?)",
      [nombre, correo ?? null, telefono ?? null]
    );
    res.status(201).json({ id: (result as any).insertId, nombre, correo, telefono });
  } catch (err: any) {
    res.status(500).json({ message: "Error al crear cliente", error: err.message });
  }
};

// Actualizar cliente
export const actualizarCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, correo, telefono } = req.body;

    const [result] = await pool.query(
      "UPDATE clientes SET nombre = ?, correo = ?, telefono = ? WHERE id = ?",
      [nombre, correo ?? null, telefono ?? null, id]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json({ id, nombre, correo, telefono });
  } catch (err: any) {
    res.status(500).json({ message: "Error al actualizar cliente", error: err.message });
  }
};

// Eliminar cliente
export const eliminarCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM clientes WHERE id = ?", [id]);

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ message: "Error al eliminar cliente", error: err.message });
  }
};