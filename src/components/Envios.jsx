import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const Envios = () => {

    const navigate=useNavigate()
    useEffect(() => {
        scroll.scrollToTop();
      }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        mt: "5rem",
        mb:'2rem',
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
         margin:'0rem auto',
          width: "90%",
          maxWidth: "50rem",
          height:'auto',
        
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          textAlign: "center",
          color: "white",
          p:'1rem'
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
