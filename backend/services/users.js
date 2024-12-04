const db = require('./db'); 
const helper = require('../helper'); 

async function getUsers(req, res) {
  try {
    const rows = await db.query('SELECT * FROM usuarios');

    const data = helper.emptyOrRows(rows);

    return res.json({ data });
  } catch (err) {
    console.error('Error al obtener los usuarios: ', err.message);
    return res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
}

async function addUser(req, res) {
  const { nombre, login, password, rol } = req.body;

  if (!nombre || !login || !password || !rol) {
    return res.status(400).json({ message: 'Faltan datos para insertar el usuario.' });
  }

  try {
    const result = await db.query(
      'INSERT INTO usuarios (nombre, login, password, rol) VALUES (?, ?, ?, ?)', 
      [nombre, login, password, rol]
    );

    if (result.affectedRows > 0) {
      return res.status(201).json({ message: 'Usuario insertado correctamente' });
    } else {
      return res.status(500).json({ message: 'Error al insertar el usuario' });
    }
  } catch (err) {
    console.error('Error al insertar el usuario: ', err.message);
    return res.status(500).json({ message: 'Error al insertar el usuario' });
  }
}

module.exports = {
  getUsers,
  addUser 
};