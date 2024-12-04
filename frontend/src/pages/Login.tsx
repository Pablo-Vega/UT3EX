import { Typography, Container, Button } from '@mui/material';

function Login() {
  return (
    <Container>
      <header>
        <Typography variant="h1" color="primary">
          Página de Toruh Delgado Lahera
        </Typography>
      </header>

      <main>
        <Typography variant="h2" color="secondary">
          Página de Toruh Delgado Lahera
        </Typography>
        <Typography variant="h3" color="error">
          Página de Toruh Delgado Lahera
        </Typography>
        <Typography variant="subtitle1" color="success">
          Página de Toruh Delgado Lahera
        </Typography>
        <Typography variant="body1" color="text.primary">
          Página de Toruh Delgado Lahera
        </Typography>
        <Typography variant="caption" color="primary">
          Página de Toruh Delgado Lahera
        </Typography>

        <Button variant="text" color="primary">Text Button</Button>
        <Button variant="contained" color="secondary">Contained Button</Button>
        <Button variant="outlined" color="error">Outlined Button</Button>
      </main>

      <footer>
        <Typography variant="body2" color="text.secondary">
          © 2024 Toruh Delgado Lahera
        </Typography>
      </footer>
    </Container>
  );
}

export default Login;