import React from 'react';
import { Box, Button, Typography } from "@mui/material";
import productos from '../../productos.json'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NavListDrawer = ({ setOpen,handleTypeSelection }) => {
  const tiposUnicos = Array.from(new Set(Object.keys(productos.productos)));

  return (
    <>
      <Box sx={{borderBottom:'2px solid #FF0000'}}>
        <Button
          sx={{
            width: "100%",
            textTransform: "capitalize",
            bgcolor: "black",
            color: "#ff0000",
            borderBottom: "1px solid #D7DBDD",
            fontSize: "1rem",
            borderRadius:'0px'
          }}
          onClick={()=>{setOpen(false),handleTypeSelection(null)}}
        >
          <ArrowBackIcon/>
          Volver al Inicio
        </Button>
        {tiposUnicos.map((tipo, index) => (
          <React.Fragment key={index}>
            <Typography
              variant="h5"
              textAlign={"center"}
              fontWeight={"bold"}
              p={'.4rem'}
              textTransform='capitalize'
            >
              {tipo}
            </Typography>
            {productos.productos[tipo].map((producto, productoIndex) => (
              <Button
                key={productoIndex}
                sx={{
                  width: "100%",
                  textTransform: "capitalize",
                  bgcolor: "#F2F3F4",
                  color: "#626567 ",
                  borderBottom: "1px solid #D7DBDD",
                  fontSize: "1rem",
                }}
                onClick={() =>{ setOpen(false),console.log(producto.tipo,"soy el tipo de navdrwa"),handleTypeSelection(producto.tipo)}}
                
              >
                {producto.tipo}
              </Button>
            ))}
          </React.Fragment>
        ))}
      </Box>
    </>
  );
};

export default NavListDrawer;
