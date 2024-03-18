import { Box, Button, Container, Typography } from "@mui/material";

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
    <Container sx={{ mt: "2rem" }}>
      <Button
        sx={{ m: " 1rem 0 0 1rem", color: "white" }}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon />
        Volver{" "}
      </Button>

      <Box
        sx={{
          m: "3rem auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "1rem",
          marginBottom: "1rem",
          width: "95%",
          maxWidth: "40rem",
          bgcolor: "white",
          borderRadius: ".5rem",
        }}
      >

      




      </Box>
    </Container>
  );
};

export default Detalle;
