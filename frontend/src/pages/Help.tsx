import React from 'react';
import { Box, Container, Typography, Paper, Button, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import Menu from '../components/Menu'; 
import { Link } from 'react-router-dom';

const Help: React.FC = () => {
  const userData = useSelector((state: any) => state.authenticator);
  const nombreUsuario = userData?.nombreUsuario || 'Usuario';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Menu nombreUsuario={nombreUsuario} />

      <Container sx={{ marginTop: 3 }}>
        <Paper sx={{ padding: 3, boxShadow: 3 }}>
          <Typography variant="h3" color="primary" align="center" gutterBottom>
            Página de Ayuda
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Bienvenido a la sección de ayuda. Aquí encontrarás información sobre cómo usar la aplicación.
          </Typography>

          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Tooltip title="Haz clic para abrir el manual de usuario en una nueva pestaña" arrow placement="top">
              <Button variant="contained" color="primary">
                <Link
                  to="/manual_usuario.pdf"
                  target="_blank"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Ver Manual de Usuario
                </Link>
              </Button>
            </Tooltip>
          </Box>

          <Typography variant="body1" paragraph sx={{ marginTop: 3 }}>
            1. **Login**: Para acceder a la aplicación, necesitas ingresar con tus credenciales de usuario.
          </Typography>
          <Typography variant="body1" paragraph>
            2. **Gestión de informes**: Una vez dentro, puedes acceder a la sección de informes desde el menú, donde podrás generar informes de la colección de productos.
          </Typography>
          <Typography variant="body1" paragraph>
            3. **Exportación**: Desde la página de informes, puedes exportar los datos en formato **PDF** o **CSV**.
          </Typography>
          <Typography variant="body1" paragraph>
            4. **Filtros y búsquedas**: En la tabla de informes, puedes filtrar por columnas como **Marca** y **Tipo** para buscar rápidamente productos específicos.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Help;