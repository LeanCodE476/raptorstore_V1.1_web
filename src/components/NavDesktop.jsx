import React from 'react';
import { Box, Button, Hidden } from "@mui/material";
import productos from "../productos.json";

const NavDesktop = ({ handleTypeSelection }) => {
  const tiposUnicos = Array.from(
    new Set(
      productos.productos.pesca
        .concat(productos.productos.electronica)
        .map((producto) => producto.tipo)
    )
  );

  return (
    <>
      <Hidden lgDown>
        <Box
          sx={{
            width: "100%",
            bgcolor: "#E5E7E9",
            boxShadow: "0px 4px 7px 0px rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            position: "sticky",
            top:'0rem',
            zIndex:'1',
          }}
        >
          <Button
            sx={{
              color: "#FF0000",
              fontSize: "1rem",
              borderRight: "1px solid #FF0000",
              '&:hover': { 
                backgroundColor: '#E74C3C',
                color: 'black',
                borderBottom: "2px solid black",
              } 
            }}
            onClick={() => handleTypeSelection(null)}
          >
            Inicio
          </Button>
          {tiposUnicos.map((tipo, index) => (
            <Button
              sx={{
                fontSize: "1rem",
                color: "black",
                borderBottom: "2px solid #FF0000",
                borderRadius: "0px",
                textTransform:'capitalize',
                '&:hover': { 
                    backgroundColor: '#E74C3C',
                    color: 'black',
                    borderBottom: "2px solid black",
                  } 
              }}
              key={index}
              onClick={() => handleTypeSelection(tipo)}
            >
              {tipo}
            </Button>
          ))}
        </Box>
      </Hidden>
    </>
  );
};

export default NavDesktop;
