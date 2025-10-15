import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
app.use(cors());
app.use(express.json());

// ===== Conexión MySQL =====
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "findyrate",
});

// ===== Registro usuario =====
app.post("/registro", async (req, res) => {
  try {
    const {
      num_doc_usuario,
      nombre_usuario,
      apellido_usuario,
      correo_usuario,
      password_usuario,
      id_tipo_rolfk,
    } = req.body;

    if (!correo_usuario || !password_usuario) {
      return res.status(400).json({ success: false, message: "Correo y contraseña requeridos" });
    }

    // Verificar correo único
    const [existingEmail] = await pool.query(
      "SELECT * FROM usuario WHERE correo_usuario = ?",
      [correo_usuario]
    );
    if (existingEmail.length > 0) {
      return res.status(409).json({ success: false, message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password_usuario, 10);

    const [result] = await pool.query(
      `INSERT INTO usuario 
      (num_doc_usuario, nombre_usuario, apellido_usuario, correo_usuario, password_usuario, id_tipo_rolfk) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [num_doc_usuario, nombre_usuario, apellido_usuario, correo_usuario, hashedPassword, id_tipo_rolfk]
    );

    res.status(201).json({ success: true, message: "Usuario registrado correctamente", id_usuario: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error en el registro", error });
  }
});

// ===== Login usuario =====
app.post("/login", async (req, res) => {
  try {
    const { correo_usuario, password_usuario } = req.body;

    if (!correo_usuario || !password_usuario) {
      return res.status(400).json({ success: false, message: "Correo y contraseña requeridos" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE correo_usuario = ?",
      [correo_usuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Usuario no encontrado" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password_usuario, user.password_usuario);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }

    res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      user: {
        id_usuario: user.id_usuario,
        nombre_usuario: user.nombre_usuario,
        correo_usuario: user.correo_usuario,
        id_tipo_rolfk: user.id_tipo_rolfk,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error en el login", error });
  }
});

// ===== Insertar lugar =====
app.post("/lugares", async (req, res) => {
  try {
    const {
      nit_lugar,
      nombre_lugar,
      localidad_lugar,
      direccion_lugar,
      red_social_lugar,
      tipo_entrada_lugar,
      id_usuariofk,
    } = req.body;

    if (!nit_lugar || !nombre_lugar || !direccion_lugar || !id_usuariofk) {
      return res.status(400).json({ success: false, message: "Faltan datos obligatorios" });
    }

    // Validar NIT único
    const [existingLugar] = await pool.query(
      "SELECT * FROM lugares WHERE nit_lugar = ?",
      [nit_lugar]
    );
    if (existingLugar.length > 0) {
      return res.status(409).json({ success: false, message: "El NIT del lugar ya está registrado" });
    }

    await pool.query(
      `INSERT INTO lugares 
      (nit_lugar, nombre_lugar, localidad_lugar, direccion_lugar, red_social_lugar, tipo_entrada_lugar, id_usuariofk) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nit_lugar, nombre_lugar, localidad_lugar, direccion_lugar, red_social_lugar, tipo_entrada_lugar, id_usuariofk]
    );

    res.status(201).json({ success: true, message: "Lugar registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al registrar el lugar", error });
  }
});

// ===== Servidor =====
app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
