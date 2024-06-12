import React, { useEffect, useState } from "react";
import { Box, Button, Typography, TextField, CircularProgress, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from 'axios';

const provincias = [
  { name: "Buenos Aires", code: "AR-B" },
  { name: "Catamarca", code: "AR-K" },
  { name: "Chaco", code: "AR-H" },
  { name: "Chubut", code: "AR-U" },
  { name: "Córdoba", code: "AR-X" },
  { name: "Corrientes", code: "AR-W" },
  { name: "Entre Ríos", code: "AR-E" },
  { name: "Formosa", code: "AR-P" },
  { name: "Jujuy", code: "AR-Y" },
  { name: "La Pampa", code: "AR-L" },
  { name: "La Rioja", code: "AR-F" },
  { name: "Mendoza", code: "AR-M" },
  { name: "Misiones", code: "AR-N" },
  { name: "Neuquén", code: "AR-Q" },
  { name: "Río Negro", code: "AR-R" },
  { name: "Salta", code: "AR-A" },
  { name: "San Juan", code: "AR-J" },
  { name: "San Luis", code: "AR-D" },
  { name: "Santa Cruz", code: "AR-Z" },
  { name: "Santa Fe", code: "AR-S" },
  { name: "Santiago del Estero", code: "AR-G" },
  { name: "Tierra del Fuego", code: "AR-V" },
  { name: "Tucumán", code: "AR-T" }
];

const Envios = () => {
  const navigate = useNavigate();
  const [codigoPostal, setCodigoPostal] = useState("");
  const [provinciaDestino, setProvinciaDestino] = useState("");
  const [loading, setLoading] = useState(false);
  const [costoEnvio, setCostoEnvio] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const cotizarEnvio = async () => {
    if (!codigoPostal) {
      setError("Por favor, ingresa un código postal válido.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://correo-argentino1.p.rapidapi.com/calcularPrecio",
        {
          cpOrigen: "3360",
          cpDestino: codigoPostal,
          peso: 1.0,
          provinciaOrigen: "AR-N",
          provinciaDestino: provinciaDestino
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-host": "correo-argentino1.p.rapidapi.com",
            "x-rapidapi-key": "3aa529d6camsh2f57c4d18cc6f2dp15ace1jsn6012d7aea6b0"
          }
        }
      );

      setCostoEnvio(response.data.costo);
    } catch (error) {
      console.log(error);
      setError("Error al cotizar el envío. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        mt: "5rem",
        mb: '2rem',
      }}
    >
      <Button
        sx={{
          m: " -5rem 0 0 1rem",
          color: "white",
          outline: "1px solid white",
          bgcolor: "black",
          "&:hover": {
            transition: "0s all",
            backgroundColor: "black",
          },
        }}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon />
        Volver
      </Button>
      <Box
        sx={{
          margin: '0rem auto',
          width: "90%",
          maxWidth: "50rem",
          height: 'auto',
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          textAlign: "center",
          color: "white",
          p: '1rem'
        }}
      >
        <Typography fontSize={"1.7rem"} color={"yellow"} fontWeight={'bold'} fontStyle={'italic'}>
          ¡Envíos Gratis!
        </Typography>
        <Typography mt={"1rem"} fontSize={'1.3rem'}>
          Realizamos envíos gratis en compras superiores a $65.000.
        </Typography>
        <Typography mt={"1rem"} fontSize={'1.3rem'}>
          Aceptamos pagos mediante transferencia bancaria y efectivo.
        </Typography>
        <Typography mt={"1rem"} fontSize={'1.3rem'}>
          Los envíos tardan entre 2 y 5 días hábiles en llegar retirando en sucursal de Correo Argentino.
        </Typography>
        <Typography mt={"1rem"} fontSize={'1.3rem'}>
          Si Queres recibir tu pedido en tu domicilio, por favor indícalo al
          momento de la compra.
        </Typography>
        <Typography mt={"1rem"} fontSize={'1.3rem'}>
          Todos los pedidos realizados se despachan diariamente a las 13:30hs
          aproximadamente.
        </Typography>

   
   
      </Box>
    </Box>
  );
};

export default Envios;
