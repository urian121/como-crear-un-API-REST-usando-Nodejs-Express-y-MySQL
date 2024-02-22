// Importa las dependencias necesarias
import express from "express";
import connection from "../configBD/ConfigBD.js";

// Configura el enrutador de Express
const router = express.Router();

// Define las rutas de la API
router.get("/", async (req, res) => {
  try {
    // Consulta todos los usuarios en la base de datos
    const [rows] = await connection.execute("SELECT * FROM tbl_alumnos");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al consultar tbl_alumnos" });
  }
});

router.post("/", async (req, res) => {
  try {
    // Crea un nuevo usuario en la base de datos
    const { nombre, email } = req.body;
    await connection.execute(
      "INSERT INTO tbl_alumnos (nombre, email) VALUES (?, ?)",
      [nombre, email]
    );
    res.status(201).send("Usuario creado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // Actualiza un usuario existente en la base de datos
    const { id } = req.params;
    const { nombre, email } = req.body;
    await connection.execute(
      "UPDATE tbl_alumnos SET nombre = ?, email = ? WHERE id = ?",
      [nombre, email, id]
    );
    res.status(200).send("Usuario actualizado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Elimina un usuario existente en la base de datos
    const { id } = req.params;
    await connection.execute("DELETE FROM tbl_alumnos WHERE id = ?", [id]);
    res.status(200).send("Usuario eliminado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

// Exporta el enrutador para su uso en otros archivos
export default router;
