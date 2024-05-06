import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CartContext } from "../Contexts/CartContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import logoCaster from "../../public/images/logo-caster.webp";
import logoAbuGarcia from "../../public/images/logoAbuGarcia.webp";
import logoBeast from "../../public/images/logo-beast.webp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "../App.css";
const Detalle = ({ products }) => {
  const logos = {
    caster: logoCaster,
    abugarcia: logoAbuGarcia,
    beast: logoBeast,
  };

  useEffect(() => {
    scroll.scrollToTop();
  }, []);
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [index, setIndex] = React.useState(0);
  const [markedIndex, setMarkedIndex] = React.useState(0);
  const { onAddProduct, cart, total, contador, increaseItems, decreaseItems } =
    useContext(CartContext);
  let product = null;
  const [showScrollButton, setShowScrollButton] = useState(false);
  const enviarMensajeWhatsApp = (codigo, nombre) => {
    const telefono = "3755503038"; // Número de teléfono al que se enviará el mensaje
    const mensaje = `Hola, quiero cotizar el envio de este producto. Código: ${codigo}, Nombre: ${nombre}`;

    const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(enlaceWhatsApp, "_blank");
  };

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

  const handleScrollToTop = () => {
    scroll.scrollToTop({
      smooth: true,
      duration: 500, // Duración del desplazamiento en milisegundos
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1500) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!product) {
    return <p>Producto no encontrado</p>;
  }
  return (
    <Box sx={{ borderBottom: "1px solid transparent" }}>
      <Button
        sx={{
          m: " 1rem 0 0 1rem",
          color: "white",
          outline: "1px solid white",
          bgcolor: "black",
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
      {showScrollButton && (
        <IconButton
          sx={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            bgcolor: "white",
            color: "black",
            zIndex: "9",
            "&:hover": {
              bgcolor: "black",
            },
          }}
          onClick={handleScrollToTop}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}
      <Box
        sx={{
          m: "1rem auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "2rem",
          maxWidth: "35rem",
          bgcolor: "white",
          borderRadius: ".5rem",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h6"
          textAlign={"start"}
          width={"90%"}
          fontSize={"1.4rem"}
          mt={"2rem"}
        >
          {product.nombre}
        </Typography>
        <Typography
          variant="h6"
          textAlign={"start"}
          width={"90%"}
          mt={"1rem"}
          color={"gray"}
          fontWeight={"400"}
        >
          {product.marca ? (
            <>
              Producto de :{" "}
              {product.marca && logos[product.marca] && (
                <img
                  className="img-marca"
                  src={logos[product.marca]}
                  alt={`logo-${product.marca}`}
                  style={{
                    width: "5rem",
                  }}
                  loading="lazy"
                />
              )}
            </>
          ) : null}
        </Typography>
        <Box sx={{ display: "flex", width: "90%", alignItems: "center" }}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            sx={{
              color:
                product.stock === "Agotado"
                  ? "red"
                  : product.stock === "stock disponible"
                  ? "green"
                  : null,
            }}
            width={"90%"}
            mt={"1rem"}
            textTransform={"capitalize"}
          >
            {product.stock}!
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
            width: "100%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            {product.stock === "Agotado" ? (
              <Box
                sx={{
                  width: "100%",
                  height: "3rem",
                  bgcolor: "#00000091",
                  zIndex: "10",
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" color={"red"} fontFamily={"Days One"}>
                  AGOTADO
                </Typography>
              </Box>
            ) : null}
            <img
              src={`/images/${product.imagenes[index]}`}
              loading="lazy"
              style={{
                width: "100%",
                boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.5)",
              }}
              alt={product.nombre}
              className="imagen-detalle"
            />
          </Box>

          <Box
            sx={{
              width: "90%",
              display: "flex",
              justifyContent: "space-around",
              marginTop: "2rem",
            }}
          >
            {product.imagenes.map((img, i) => (
              <img
                className="imagen-miniatura"
                loading="lazy"
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

        <Typography variant="h4" width={"90%"} mt={"2rem"} textAlign={"start"}>
          ${formattedPrice}
        </Typography>
        {product.stock === "stock disponible" ? (
          <Box
            sx={{
              width: "95%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "2rem",
              maxWidth: "20rem",
              padding: ".5rem",
              borderRadius: ".5rem",
              boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.5)",
            }}
          >
            <Box
              sx={{
                height: "2rem",
                width: "8rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: ".3rem",
                overflow: "hidden",
                boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.5)",
              }}
            >
              <IconButton
                sx={{
                  borderRadius: "0rem",

                  opacity: cantidad === 1 ? 0 : 1,
                  bgcolor: "#F1C40F",
                }}
                disabled={cantidad === 1}
                onClick={handleDecrease}
              >
                <RemoveIcon sx={{ color: "#424949 ", fontSize: "1.6rem" }} />
              </IconButton>

              <Typography
                sx={{ fontWeight: "bold", margin: "1rem", fontSize: "1.6rem" }}
              >
                {cantidad}
              </Typography>

              <IconButton
                sx={{
                  borderRadius: "0rem",
                  bgcolor: "#F1C40F",
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
                width: "9rem",
                height: "2rem",
                borderRadius: ".3rem",
                fontWeight: "bold",
                fontSize: ".7rem",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
              onClick={handleAddToCart}
            >
              Agregar al Carrito
              <AddShoppingCartIcon
                sx={{ fontSize: "1.2rem", marginLeft: ".5rem" }}
              />
            </IconButton>
          </Box>
        ) : null}

        <Typography
          variant="h5"
          width={"90%"}
          mt={"1.5rem"}
          textAlign={"center"}
        >
          Caracteristicas
        </Typography>
        <Box sx={{ width: "90%" }}>
          <ul
            style={{
              listStyle: "none",
              marginTop: "1rem",
              fontSize: "1.1rem",
              fontWeight: "400",
            }}
          >
            {product.descripcion.map((desc, i) => (
              <li key={i} style={{ marginTop: ".5rem", color: "gray" }}>
                -{desc}
              </li>
            ))}
          </ul>
        </Box>
        <Typography mt={"2rem"} width={"90%"} variant="h6" fontSize={"1rem"}>
          Queres cotizar el envio de este producto?{" "}
          <Button
            sx={{
              color: "red",
              textTransform: "capitalize",
              padding: ".2rem",
              fontWeight: "bold",
            }}
            onClick={() =>
              enviarMensajeWhatsApp(product.codigo, product.nombre)
            }
          >
            Click Aca
          </Button>
        </Typography>
        <Box
          sx={{
            width: "100%",
            mt: "3rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {product.imagenesVertical?.map((img, i) => (
            <img
              src={`/images/${img}`}
              key={i}
              alt={product.imagenesVertical[i]}
              style={{ width: "100%" }}
              loading="lazy"
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Detalle;
