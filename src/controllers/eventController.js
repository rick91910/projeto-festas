const pool = require('../config/db');

// GET /api/events - Listar todos os eventos (com nomes da categoria e organizador)
exports.listarEventos = async (req, res) => {
  try {
    const query = `
      SELECT 
        e.id, 
        e.title, 
        e.description, 
        e.location, 
        e.event_date, 
        e.capacity, 
        e.cover_url,
        c.name AS category_name,
        u.name AS organizer_name
      FROM Event e
      JOIN EventCategory c ON e.category_id = c.id
      JOIN "User" u ON e.organizer_id = u.id
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/events - Criar um novo evento
exports.criarEvento = async (req, res) => {
  const { title, description, location, event_date, capacity, cover_url, organizer_id, category_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Event (title, description, location, event_date, capacity, cover_url, organizer_id, category_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, description, location, event_date, capacity, cover_url, organizer_id, category_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).json({ error: error.message });
  }
};