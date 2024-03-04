import { Container, Grid } from "@mui/material";
import CardProductos from "./CardProductos";

const GridProductos = () => {
  const productos = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1,

    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1,

    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1,
  ];
  return (
    <Container sx={{ mt: "6rem" }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {productos.map((product, index) => (
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
            <CardProductos />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GridProductos;
