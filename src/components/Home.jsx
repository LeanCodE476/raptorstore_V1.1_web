import { Box, Button, Container, Grid } from "@mui/material";
import CardProductos from "./CardProductos";
import productos from "../productos.json";
import { useNavigate } from "react-router-dom";
import Envio from "../components/Envio";

const Home = () => {
  // Obtén un array de productos combinando todas las categorías
  const allProducts = Object.values(productos.productos).flat();
  const navigate = useNavigate();

  return (
    <>
      <Envio />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          margin: "2rem auto",
          minWidth: "23rem",
          maxWidth: "30rem",
        }}
      >
        <Button
          sx={{ bgcolor: "black", color: "white", width: "8rem" }}
          onClick={() => navigate("/pesca")}
        >
          Pesca
        </Button>
        <Button
          sx={{ bgcolor: "black", color: "white", width: "8rem" }}
          onClick={() => navigate("/electronica")}
        >
          Electronica
        </Button>
      </Box>
      <Container sx={{ mt: "3rem" }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {allProducts.map((product, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              lg={2}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              key={index}
            >
              <CardProductos
                url={product.imagenes[0]}
                price={product.precio}
                stock={product.stock}
                name={product.nombre}
                codigo={product.codigo}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
