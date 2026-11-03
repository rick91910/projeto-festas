const pool = require('../config/db');

// GET /api/attendances - Listar todas as presenças (com título do evento e nome do usuário)
exports.listarPresencas = async (req, res) => {
  try {
    const query = `
      SELECT 
        a.id, 
        a.attended, 
        e.title AS event_title, 
        u.name AS user_name
      FROM Attendance a
      JOIN Event e ON a.event_id = e.id
      JOIN "User" u ON a.user_id = u.id
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar presenças:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/attendances - Registrar presença em um evento
exports.criarPresenca = async (req, res) => {
  const { event_id, user_id, attended } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Attendance (event_id, user_id, attended)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [event_id, user_id, attended !== undefined ? attended : true]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao registrar presença:', error);
    res.status(500).json({ error: error.message });
  }
};