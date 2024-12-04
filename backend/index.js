const express = require('express');
const cors = require('cors');

const login = require('./services/login');
const items = require('./services/items');
const users = require('./services/users');  

const port = 3030;

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Hola Mundo!' });
});

app.get('/login', async (req, res, next) => {
  console.log(req.query);
  console.log(req.query.user);
  console.log(req.query.password);
  try {
    res.json(await login.getUserData(req.query.user, req.query.password));
  } catch (err) {
    console.error(`Error while getting login data: ${err.message}`);
    next(err);
  }
});

app.post('/addItem', async (req, res) => {
  try {
    await items.insertData(req, res); 
  } catch (err) {
    console.error(`Error while inserting item: ${err.message}`);
    res.status(500).json({ message: 'Error al insertar el item' });
  }
});

app.get('/getItems', async (req, res) => {
  try {
    await items.getData(req, res);
  } catch (err) {
    console.error(`Error while getting items: ${err.message}`);
    res.status(500).json({ message: 'Error al obtener los items' });
  }
});

app.get('/deleteItem', async (req, res) => {
  try {
    const { id } = req.query; 
    if (!id) {
      return res.status(400).json({ message: 'ID del item es necesario para eliminar' });
    }
    await items.deleteData(req, res);
  } catch (err) {
    console.error(`Error while deleting item: ${err.message}`);
    res.status(500).json({ message: 'Error al eliminar el item' });
  }
});

app.get('/getUsers', async (req, res) => {
  try {
    await users.getUsers(req, res);  
  } catch (err) {
    console.error(`Error while getting users: ${err.message}`);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

app.post('/addUser', async (req, res) => {
  try {
    await users.addUser(req, res); 
  } catch (err) {
    console.error(`Error while adding user: ${err.message}`);
    res.status(500).json({ message: 'Error al agregar el usuario' });
  }
});

app.listen(port, () => {
  console.log('API escuchando en el puerto ' + port);
});