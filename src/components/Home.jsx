import { useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import CardProductos from "./CardProductos";
import productos from "../productos.json";
import Anuncio1 from "./Anuncio1";
import Anuncio2 from "./Anuncio2";
import Navbar from "./navbar/Navbar";
import NavDesktop from "./navbar/NavDesktop";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
const Home = () => {
  const [selectedType, setSelectedType] = useState(null);

  const allProducts = Object.values(productos.productos).flat();
  const filteredProducts = selectedType
    ? allProducts.filter((product) => product.tipo === selectedType)
    : allProducts;

  const handleTypeSelection = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

  //EN CASO DE MOSTRAR EL BOTON DE MOSTRAR TODO SE CENTRA Y/O AJUSTA
  const justifyContentValue = selectedType ? "space-between" : "center";

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <NavDesktop handleTypeSelection={handleTypeSelection} />
        <Navbar handleTypeSelection={handleTypeSelection} />

        <Anuncio1 />
        <Anuncio2 />
        <Container sx={{ m: "1.5rem auto", pb: "2rem", maxWidth: "80rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: justifyContentValue,
              width: "90%",
              height: "2rem",
              m: "1rem auto",
            }}
          >
            {" "}
            <Typography
              color={"white"}
              variant="h6"
              textAlign={"center"}
              fontSize={"1.2rem"}
              fontWeight={"bold"}
              width={"17rem"}
            >
              {" "}
              Sección{" "}
              <span style={{ textTransform: "capitalize" }}>
                {selectedType ? selectedType : "Principal"}
              </span>{" "}
            </Typography>
            {selectedType ? (
              <Button
                sx={{
                  m: " 0rem 0 0 1rem",
                  color: "white",
                  outline: "1px solid white",
                  width: "9rem",
                  "&:hover": {
                    transition: "0s all",
                    backgroundColor: "black",
                  },
                }}
                onClick={() => handleTypeSelection(null)}
              >
                Volver
                <FilterAltIcon />
              </Button>
            ) : null}
          </Box>

          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {filteredProducts.map((product, index) => (
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
      </div>
    </>
  );
};

export default Home;
