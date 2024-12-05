import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector } from 'react-redux';

interface ItemType {
  id: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
}

const Dashboard: React.FC = () => {
  const [item, setItem] = useState<ItemType>({
    id: 0,
    nombre: '',
    marca: '',
    tipo: '',
    precio: 0,
  });
  const [error, setError] = useState<string>('');
  const [itemsList, setItemsList] = useState<ItemType[]>([]);

  const userRole = useSelector((state: any) => state.authenticator?.rol);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const validateForm = (): boolean => {
    if (!item.nombre || !item.marca || !item.tipo || item.precio <= 0) {
      setError('Por favor, completa todos los campos correctamente.');
      return false;
    }
    setError('');
    return true;
  };

  const fetchItems = async () => {
    const response = await fetch('http://localhost:3030/getItems');
    const data = await response.json();
    setItemsList(data.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const response = await fetch('http://localhost:3030/addItem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      alert('Item insertado correctamente');
      setItem({ id: 0, nombre: '', marca: '', tipo: '', precio: 0 });
      fetchItems();
    } else {
      alert('Error al insertar el item');
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`http://localhost:3030/deleteItem?id=${id}`, { method: 'GET' });
    if (response.ok) {
      alert('Item eliminado correctamente');
      fetchItems();
    } else {
      alert('Error al eliminar el item');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>Agregar un nuevo producto para el supermercado</Typography>

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Introduce el nombre del producto" arrow placement="top">
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                name="nombre"
                value={item.nombre}
                onChange={handleChange}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Introduce la marca del producto" arrow placement="top">
              <TextField
                label="Marca"
                variant="outlined"
                fullWidth
                name="marca"
                value={item.marca}
                onChange={handleChange}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Introduce el tipo del producto" arrow placement="top">
              <TextField
                label="Tipo"
                variant="outlined"
                fullWidth
                name="tipo"
                value={item.tipo}
                onChange={handleChange}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Introduce el precio del producto" arrow placement="top">
              <TextField
                label="Precio"
                variant="outlined"
                fullWidth
                type="number"
                name="precio"
                value={item.precio}
                onChange={handleChange}
              />
            </Tooltip>
          </Grid>
        </Grid>
        <Tooltip title="Haz clic para insertar un nuevo producto" arrow placement="top">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={userRole !== 'admin'}
          >
            Insertar Datos
          </Button>
        </Tooltip>
      </Box>

      <Typography variant="h6" gutterBottom>Items Insertados:</Typography>

      <TableContainer sx={{ maxHeight: 400 }}>
        <Table aria-label="Items Table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Marca</strong></TableCell>
              <TableCell><strong>Tipo</strong></TableCell>
              <TableCell><strong>Precio</strong></TableCell>
              {userRole === 'admin' && <TableCell><strong>Acciones</strong></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsList.length > 0 ? (
              itemsList.map((row: ItemType) => (
                <TableRow key={row.id}>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.marca}</TableCell>
                  <TableCell>{row.tipo}</TableCell>
                  <TableCell>{row.precio}</TableCell>
                  {userRole === 'admin' && (
                    <TableCell>
                      <Tooltip title="Eliminar este ítem" arrow placement="left">
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleDelete(row.id)}
                        >
                          <DeleteForeverIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay datos disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;