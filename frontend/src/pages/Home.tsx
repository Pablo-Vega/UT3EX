import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelector} from 'react-redux';
import Dashboard from '../components/Dashboard'; 
import Menu from '../components/Menu'; 

const Home: React.FC = () => {
  const navigate = useNavigate();

  const userData = useSelector((state: any) => state.authenticator);
  const isAuthenticated = userData?.isAuthenticated;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Menu nombreUsuario={userData?.nombreUsuario} />
      <Dashboard /> 
    </Box>
  );
};

export default Home;