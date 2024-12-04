import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';

interface UserType {
  id: number;
  nombre: string;
  login: string;
  password: string;
  rol: string;
}

const ManageUsers: React.FC = () => {
  const [user, setUser] = useState<UserType>({
    id: 0,
    nombre: '',
    login: '',
    password: '',
    rol: '',
  });
  const [error, setError] = useState<string>('');
  const [usersList, setUsersList] = useState<UserType[]>([]);

  const userRole = useSelector((state: any) => state.authenticator?.rol);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole) {
      navigate('/');
    }
    fetchUsers();
  }, [userRole, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = (): boolean => {
    if (!user.nombre || !user.login || !user.password || !user.rol) {
      setError('Por favor, completa todos los campos correctamente.');
      return false;
    }
    if (user.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    setError('');
    return true;
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3030/getUsers');
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const data = await response.json();
      setUsersList(data.data || []);
    } catch (error) {
      setError('Hubo un problema al cargar los usuarios.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:3030/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Error al insertar el usuario');
      }

      alert('Usuario insertado correctamente');
      setUser({ id: 0, nombre: '', login: '', password: '', rol: '' });
      fetchUsers();
    } catch {
      alert('Error al insertar el usuario');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Menu />

      <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="md">
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Gestión de Usuarios
          </Typography>

          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}

          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, backgroundColor: '#fff', padding: 3, borderRadius: 2, boxShadow: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Tooltip title="Introduce el nombre completo del usuario" arrow placement="top">
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    name="nombre"
                    value={user.nombre}
                    onChange={handleChange}
                    required
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Tooltip title="Introduce el nombre de usuario" arrow placement="top">
                  <TextField
                    label="Login"
                    variant="outlined"
                    fullWidth
                    name="login"
                    value={user.login}
                    onChange={handleChange}
                    required
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Tooltip title="Introduce una contraseña (mínimo 6 caracteres)" arrow placement="top">
                  <TextField
                    label="Contraseña"
                    variant="outlined"
                    fullWidth
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Tooltip title="Especifica el rol del usuario (ejemplo: admin, user)" arrow placement="top">
                  <TextField
                    label="Rol"
                    variant="outlined"
                    fullWidth
                    name="rol"
                    value={user.rol}
                    onChange={handleChange}
                    required
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Tooltip title="Haz clic aquí para registrar un nuevo usuario" arrow placement="top">
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, width: '100%' }}>
                Insertar Usuario
              </Button>
            </Tooltip>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
            Usuarios Registrados:
          </Typography>

          <Paper sx={{ padding: 2, boxShadow: 2 }}>
            <TableContainer>
              <Table aria-label="Users Table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Nombre</strong></TableCell>
                    <TableCell><strong>Login</strong></TableCell>
                    <TableCell><strong>Rol</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersList.length > 0 ? (
                    usersList.map((user: UserType) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.nombre}</TableCell>
                        <TableCell>{user.login}</TableCell>
                        <TableCell>{user.rol}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No hay usuarios registrados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ManageUsers;