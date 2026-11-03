const pool = require('../config/db');

// GET /api/users - Listar todos os utilizadores
exports.listarUsuarios = async (req, res) => {
  try {
    // Aspas duplas em "User" para evitar conflito com a palavra reservada do PostgreSQL
    const result = await pool.query('SELECT id, name, email, role FROM "User"');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao procurar utilizadores:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/users - Criar um novo utilizador
exports.criarUsuario = async (req, res) => {
  const { name, email, password_hash, role } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO "User" (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, password_hash, role || 'USER']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar utilizador:', error);
    res.status(500).json({ error: error.message });
  }
};