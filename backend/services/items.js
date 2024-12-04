const db = require('./db'); 
const helper = require('../helper'); 
const config = require('../config'); 

async function insertData(req, res) {
  const { nombre, marca, tipo, precio } = req.body; 

  if (!nombre || !marca || !tipo || !precio) {
    return res.status(400).json({ message: 'Faltan datos para insertar el item.' });
  }

  try {
    const result = await db.query(
      'INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)',
      [nombre, marca, tipo, precio] 
    );

    if (result.affectedRows > 0) {
      return res.status(201).json({ message: 'Item insertado correctamente' });
    } else {
      return res.status(500).json({ message: 'Error al insertar el item' });
    }
  } catch (err) {
    console.error('Error al insertar el item: ', err.message);
    return res.status(500).json({ message: 'Error al insertar el item' });
  }
}

async function getData(req, res) {
  try {
    const rows = await db.query('SELECT * FROM coleccion');

    const data = helper.emptyOrRows(rows);
 
    return res.json({ data });
  } catch (err) {
    console.error('Error al obtener los datos: ', err.message);
    return res.status(500).json({ message: 'Error al obtener los datos' });
  }
}

async function deleteData(req, res) {
  const { id } = req.query; 

  if (!id) {
    return res.status(400).json({ message: 'ID del item es requerido para eliminar' });
  }

  try {
    const result = await db.query('DELETE FROM coleccion WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Item eliminado correctamente' });
    } else {
      return res.status(500).json({ message: 'Error al eliminar el item' });
    }
  } catch (err) {
    console.error('Error al eliminar el item: ', err.message);
    return res.status(500).json({ message: 'Error al eliminar el item' });
  }
}

module.exports = {
  getData,
  insertData,
  deleteData,
};