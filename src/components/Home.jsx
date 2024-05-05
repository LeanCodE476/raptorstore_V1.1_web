import { useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import CardProductos from "./CardProductos";
import productos from "../productos.json";
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
      <div
        style={{
          minHeight: "100vh",
          overflow:'auto',
          borderBottom:'2px solid transparent'
        
        }}
      >
        <NavDesktop handleTypeSelection={handleTypeSelection} />
        <Navbar handleTypeSelection={handleTypeSelection} />
        <Box
          sx={{ m: "1.5rem auto",  maxWidth: "60rem", width: "95%" }}
        >
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
            fontSize={"1.2rem"}
            width={"100%"}
            fontWeight={"bold"}
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
                  width: "10rem",
                  fontSize: ".7rem",
                  "&:hover": {
                    transition: "0s all",
                    backgroundColor: "black",
                  },
                }}
                onClick={() => handleTypeSelection(null)}
                >
                Ver Todo
                <FilterAltIcon />
                </Button>
              ) : null}
              </Box>
              
            
              <Grid container rowSpacing={3} columnSpacing={0}>
              {filteredProducts.map((product, index) => (
                <Grid
                item
                xs={6}
                sm={4}
                md={3}
                lg={3}
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
        </Box>
      </div>
    </>
  );
};

export default Home;
