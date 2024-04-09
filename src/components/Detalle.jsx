import React, { useContext, useState } from "react";
import { Button, Container, Typography, Box, IconButton, Divider } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CartContext } from "../Contexts/CartContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

const Detalle = ({ products }) => {


  useEffect(() => {
    scroll.scrollToTop();
  }, []);
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [index, setIndex] = React.useState(0);
  const [markedIndex, setMarkedIndex] = React.useState(0);
  const { onAddProduct,cart, total, contador, increaseItems, decreaseItems } = useContext(CartContext);
  let product = null;

  for (const categoryKey in products.productos) {
    if (Object.prototype.hasOwnProperty.call(products.productos, categoryKey)) {
      const category = products.productos[categoryKey];
      const currentProduct = category.find((item) => item.codigo === codigo);
      if (currentProduct) {
        product = currentProduct;
        break;
      }
    }
  }

  const changeIndex = (newIndex) => {
    setIndex(newIndex);
  };

  const markImage = (newIndex) => {
    setMarkedIndex(newIndex);
    setIndex(newIndex);
  };

  const formattedPrice = product ? product.precio.toFixed(3) : "";

  const [cantidad, setCantidad] = useState(product.cantidad || 0);

  const handleIncrease = () => {
    setCantidad(cantidad + 1);
  };

  const handleDecrease = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleAddToCart = () => {
    const productToAdd = { ...product, cantidad: cantidad };
    onAddProduct(productToAdd);
    setCantidad(1);
  };

  if (!product) {
    return <p>Producto no encontrado</p>;
  }
  return (
    <Container sx={{ mt: "2rem" }}>
      <Button
        sx={{
          m: " 0rem 0 0 1rem",
          color: "white",
          outline: "1px solid white",
          "&:hover": {
            transition: "0s all",
            backgroundColor: "black",
          },
        }}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon />
        Volver
      </Button>
      <Box
        sx={{
          m: "1rem auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "1rem",
          paddingBottom:'2rem',
          marginBottom: "2rem",
          width: "100%",
          maxWidth: "40rem",
          bgcolor: "white",
          borderRadius: ".5rem",
          borderTop: "2px solid #ff0000",
          borderBottom: "2px solid #ff0000",
        }}
      >
        <Typography variant="h6" textAlign={'center'} width={'90%'}>{product.nombre}</Typography>
        <Box sx={{ display: "flex", width: "90%", alignItems: "center" }}>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            color={"#ff0000"}
            width={"90%"}
            mt={"1rem"}
          >
            ${formattedPrice}
          </Typography>
          <Typography variant="p" color={"gray"} marginTop={" 1rem"}>
            Cod:{product.codigo}
          </Typography>
        </Box>

        <Box
          sx={{
            mt: "1rem",
            minHeight: "5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={`/images/${product.imagenes[index]}`}
            loading='lazy'

            style={{
              maxWidth: "90%",
              boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.5)",
              borderRadius: ".5rem ",
            }}
            alt={product.nombre}

          className="imagen-detalle"
          />
          <Box
            sx={{
              width:'90%',
              maxWidth:'20rem',
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            {product.imagenes.map((img, i) => (
              <img
                className="imagen-miniatura"
                loading='lazy'

                src={`/images/${img}`}
                key={i}
                style={{
                  width: "5rem",
                  cursor: "pointer",
                  borderRadius: ".5rem",
                  outline:
                    i === markedIndex
                      ? "2px solid gray"
                      : "0px solid transparent",
                }}
                onClick={() => {
                  changeIndex(i);
                  markImage(i);
                }}
                onMouseOver={() => markImage(i)}
                alt={product.nombre}
              />
            ))}
          </Box>
        </Box>

        <Typography
          variant="h5"
          width={"90%"}
          mt={"2rem"}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          Caracteristicas
        </Typography>
        <Box sx={{ width: "90%" }}>
          <ul
            style={{
              listStyle: "none",
              marginTop: "1rem",
              fontSize: "1.1rem",
              fontWeight: "500",
            }}
          >
            {product.descripcion.map((desc, i) => (
              <li key={i} style={{ marginTop: ".5rem",color:'gray' }}>
                -{desc}
              </li>
            ))}
          </ul>
        </Box>
        <Box
        sx={{
          width: "90%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop:'2rem',
          maxWidth:'20rem',
          bgcolor:'#D0D3D4 ',
          padding:'.5rem',
          borderRadius:'.5rem'
        }}
      >
     
        <Box
          sx={{
            height: "2rem",
            width: "5rem",
            borderRadius: ".3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            sx={{
              bgcolor: "#E5E7E9",
              padding: ".2rem",
              opacity: cantidad === 1 ? 0 : 1,
            }}
            disabled={cantidad === 1}
            onClick={handleDecrease}
          >
            <RemoveIcon sx={{ color: "#424949 ", fontSize: "1.6rem" }} />
          </IconButton>

          <Typography sx={{ fontWeight: "bold", margin: ".5rem" }}>
            {cantidad}
          </Typography>

          <IconButton
            sx={{
              bgcolor: "#E5E7E9",
              padding: ".2rem",
            }}
            onClick={handleIncrease}
          >
            <AddIcon sx={{ color: "#424949  ", fontSize: "1.6rem" }} />
          </IconButton>
        </Box>
        <IconButton
          sx={{
            bgcolor: "#1F1F1F",
            color: "white",
            width: "7rem",
            height: "2rem",
            borderRadius: ".3rem",
            fontSize:'1rem',
            fontWeight:'bold',
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
          onClick={handleAddToCart}
        >
        Agregar

          <AddShoppingCartIcon sx={{ fontSize: "1.2rem",marginLeft:'.5rem'}} />
        </IconButton>
      </Box>
   
      </Box>
    </Container>
  );
};

export default Detalle;
