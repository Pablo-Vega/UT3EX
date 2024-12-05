import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Button, Paper, CircularProgress, Alert, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "../components/Menu";
import InformeUsuarios from "../components/InformeColeccion";
import InformeColeccion from "../components/informeUsuarios";

const Reports: React.FC = () => {
  const navigate = useNavigate();
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isUserReportVisible, setIsUserReportVisible] = useState(false); 
  const [isCollectionReportVisible, setIsCollectionReportVisible] = useState(false);
  const userDataAuth = useSelector((state: any) => state.authenticator);
  const isAuthenticated = userDataAuth?.isAuthenticated;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleToggleUserReport = () => {
    setIsUserReportVisible((prevState) => !prevState); 
    if (!isUserReportVisible) {
      fetchUserReportData(); 
    }
  };

  const handleToggleCollectionReport = () => {
    setIsCollectionReportVisible((prevState) => !prevState);
    if (!isCollectionReportVisible) {
      fetchReportData(); 
    }
  };

  const fetchReportData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3030/getUsers");
      const data = await response.json();

      if (response.ok) {
        setData(data.data); 
        setIsReportGenerated(true);
        setIsCollectionReportVisible(true); 
      } else {
        throw new Error("Error al obtener los datos del informe");
      }
    } catch {
      setError("Hubo un problema al cargar los datos. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReportData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3030/getItems"); 
      const data = await response.json();

      if (response.ok) {
        setUserData(data.data); 
        setIsUserReportVisible(true); 
      } else {
        throw new Error("Error al obtener los datos del informe de usuarios");
      }
    } catch (error) {
      setError("Hubo un problema al cargar los datos de los usuarios. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Menu nombreUsuario={userDataAuth?.nombreUsuario} />

      <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 3 }}>
        <Typography variant="h3" color="primary" align="center" gutterBottom>
          Página de Reportes
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" paragraph>
          Aquí puedes generar informes detallados de la colección y de los usuarios. Haz clic en los botones de abajo para generar los informes.
        </Typography>

        {!loading && (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, mt: 3 }}>
            <Tooltip title="Haz clic para generar el informe de la colección" arrow placement="top">
              <Button
                variant="contained"
                color="primary"
                onClick={handleToggleCollectionReport} 
                sx={{
                  padding: "12px 24px",
                  borderRadius: "20px",
                  fontSize: "16px",
                  width: "50%",
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: "#1976d2",
                  },
                }}
              >
                GENERAR INFORME USUARIOS
              </Button>
            </Tooltip>

            <Tooltip title="Haz clic para generar el informe de los usuarios" arrow placement="top">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleToggleUserReport} 
                sx={{
                  padding: "12px 24px",
                  borderRadius: "20px",
                  fontSize: "16px",
                  width: "50%",
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                  },
                }}
              >
                GENERAR INFORME COLECCION
              </Button>
            </Tooltip>
          </Box>
        )}

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {isCollectionReportVisible && !loading && (
          <Paper sx={{ mt: 4, padding: 3, boxShadow: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Informe de Usuarios
            </Typography>
            <InformeColeccion data={data} />
          </Paper>
        )}

        {isUserReportVisible && !loading && (
          <Paper sx={{ mt: 4, padding: 3, boxShadow: 3 }}>
            <Typography variant="h6" color="secondary" gutterBottom>
              Informe de la Coleccion
            </Typography>
            <InformeUsuarios data={userData} /> 
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Reports;