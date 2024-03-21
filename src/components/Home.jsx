import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import CardProductos from "./CardProductos";
import productos from "../productos.json";
import Header from "./Header";
import Anuncio1 from "./Anuncio1";
import Anuncio2 from "./Anuncio2";
import Navbar from "./navbar/Navbar";
import NavDesktop from "./NavDesktop";
import Footer from "./Footer";

const Home = () => {

  const [selectedType, setSelectedType] = useState(null);

  const allProducts = Object.values(productos.productos).flat();
  const filteredProducts = selectedType
    ? allProducts.filter((product) => product.tipo === selectedType)
    : allProducts;


  const handleTypeSelection = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

  return (
    <>
      <div style={{ minHeight: "100vh"}}>
        <NavDesktop handleTypeSelection={handleTypeSelection} />
        <Navbar handleTypeSelection={handleTypeSelection} />

        <Anuncio1 />
        <Anuncio2 />
        <Container sx={{ m: "1.5rem auto", pb: "2rem", maxWidth: "80rem" }}>
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
