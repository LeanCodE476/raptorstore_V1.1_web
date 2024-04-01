import React from 'react';
import { Box, Button, Typography } from "@mui/material";
import productos from '../../productos.json'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NavListDrawer = ({ setOpen, handleTypeSelection }) => {
  // Crear un conjunto para almacenar tipos únicos
  const tiposUnicos = new Set();

  // Iterar sobre los productos y agregar los tipos únicos al conjunto
  Object.values(productos.productos).forEach(productosTipo => {
    productosTipo.forEach(producto => {
      tiposUnicos.add(producto.tipo);
    });
  });

  return (
    <>
      <Box sx={{ borderBottom: '2px solid #FF0000' }}>
        <Typography variant='h5' textAlign={'center'} color={'#ff0000'} bgcolor={'black'} height={'3rem'} lineHeight={'3rem'} onClick={() => setOpen(false)}>Cerrar </Typography>
        <hr />
        {[...tiposUnicos].map((tipo, index) => (
          <Button
            key={index}
            sx={{
              width: "100%",
              textTransform: "capitalize",
              bgcolor: "#F2F3F4",
              color: "#626567 ",
              borderBottom: "1px solid #D7DBDD",
              fontSize: "1rem",
            }}
            onClick={() => { setOpen(false), handleTypeSelection(tipo) }}
          >
            {tipo}
          </Button>
        ))}
        <Button
          sx={{
            width: "100%",
            textTransform: "capitalize",
            bgcolor: "black",
            color: "#ff0000",
            borderBottom: "1px solid #D7DBDD",
            fontSize: "1rem",
            borderRadius: '0px'
          }}
          onClick={() => { setOpen(false), handleTypeSelection(null) }}
        >
          <ArrowBackIcon />
          Volver al Inicio
        </Button>
      </Box>
    </>
  );
};

export default NavListDrawer;
