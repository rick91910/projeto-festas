const pool = require('../config/db');

// GET /api/categories - Listar todas as categorias
exports.listarCategorias = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM EventCategory');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/categories - Criar uma nova categoria
exports.criarCategoria = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO EventCategory (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: error.message });
  }
};