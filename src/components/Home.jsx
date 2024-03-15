import { Box, Button, Container, Grid } from "@mui/material";
import CardProductos from "./CardProductos";
import productos from "../productos.json";
import Header from "./Header";
import Anuncio1 from "./Anuncio1";
import Anuncio2 from "./Anuncio2";



const Home = () => {
  // Obtén un array de productos combinando todas las categorías
  const allProducts = Object.values(productos.productos).flat();


  return (
    <>
      <Header />
      <Anuncio1 />
      <Anuncio2 />

      <Container sx={{ mt: "9rem", pb: "2rem" }}>
        {" "}
        {/* CONTAINER DEL GRID PROD */}
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
              <CardProductos product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
