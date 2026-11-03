const pool = require('../config/db');

// GET /api/maintain-events - Listar quem mantêm os eventos
exports.listarManutenções = async (req, res) => {
  try {
    const query = `
      SELECT 
        m.id, 
        e.title AS event_title, 
        u.name AS user_name
      FROM MaintainEvent m
      JOIN Event e ON m.event_id = e.id
      JOIN "User" u ON m.user_id = u.id
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar manutenções de evento:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/maintain-events - Vincular um utilizador à manutenção do evento
exports.criarManutenção = async (req, res) => {
  const { event_id, user_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO MaintainEvent (event_id, user_id)
       VALUES ($1, $2)
       RETURNING *`,
      [event_id, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao registrar manutenção:', error);
    res.status(500).json({ error: error.message });
  }
};