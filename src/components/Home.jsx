import { Box, Button, Container, Grid } from "@mui/material";
import CardProductos from "./CardProductos";
import productos from "../productos.json";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";


const Home = () => {
  // Obtén un array de productos combinando todas las categorías
  const allProducts = Object.values(productos.productos).flat();
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          margin: "6rem auto",
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
      <Container sx={{ mt: "-2rem", pb: "2rem" }}>
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
                outline:'1px solid red'
              }}
              key={index}
            >
              <CardProductos
               
                product={product}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer/>
    </>
  );
};

export default Home;
