import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import reel from "../images/reel.jpeg";
const Detalle = ({ products }) => {
  const { codigo } = useParams();
  const navigate = useNavigate();
  // Buscar el producto en la lista de productos
  let product = null;

  // Recorre las categorías en el objeto products.productos
  for (const categoryKey in products.productos) {
    if (Object.prototype.hasOwnProperty.call(products.productos, categoryKey)) {
      const category = products.productos[categoryKey];
      // Intentar encontrar el producto en la categoría actual
      const currentProduct = category.find((item) => item.codigo === codigo);
      // Si el producto fue encontrado, asigna el valor y detén el bucle
      if (currentProduct) {
        product = currentProduct;
        break;
      }
    }
  }

  // Verificar si se encontró el producto
  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  // Renderizar el componente con los detalles del producto
  return (
    <Container sx={{ bgcolor: "white" }}>
      <Button
        sx={{ m: " 5rem 0 0 1rem", bgcolor: "black", color: "white" }}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon />
        Volver{" "}
      </Button>
      <Box
        sx={{
          mt: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pb:'3rem'
        }}
      >
        <Typography>Cod:{product.codigo}</Typography>
        <Typography variant="h5" >{product.nombre}</Typography>
        <img
          src={reel || product.imagenes[0]}
          alt={product.nombre}
          style={{ width: "100%", marginTop: ".5rem", aspectRatio: "4/3" }}
        />
        <Typography variant="h5" fontWeight={700}>${product.precio}</Typography>

        <Typography variant="h5" fontWeight={500} mt={'5rem'} >Descripcion:</Typography>


        <ul style={{ listStyle: "none" }}>
          {product.descripcion.map((descripcion, i) => (
            <li key={i} style={{ marginTop: "1rem", fontWeight: "600" }}>
              -{descripcion}
            </li>
          ))}
        </ul>
        <Button
        variant="contained"
        disabled={!product.stock} // Deshabilita el botón cuando stock es false
        sx={{
          width:'15rem',
          bgcolor: product.stock ? "#00B51D" : "#888888", // Cambia el color según stock
          color: "white",
          outline: "1px solid black",
          mt: "2rem",
          p: ".3rem .5rem .3rem .5rem",
          fontFamily: "Roboto",
          fontSize: ".9rem",
          "&:hover": {
            backgroundColor: "white",
            color: product.stock ? "#00B51D" : "#888888", // Cambia el color al hacer hover según stock
            outline: `1px solid ${product.stock ? "#00B51D" : "#888888"}`, // Cambia el color del contorno al hacer hover según stock
          },
        }}
      >
        Comprar{" "}
        <WhatsAppIcon
          sx={{
            ml: ".3rem",
          }}
        />
      </Button>
      </Box>
    </Container>
  );
};

export default Detalle;
