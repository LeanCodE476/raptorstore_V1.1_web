import React, { useContext, useState, useEffect } from "react";
import {
  Button, Typography, Box, IconButton,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CartContext } from "../Contexts/CartContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { animateScroll as scroll } from "react-scroll";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import logoCaster from "../../public/images/logo-caster.webp";
import logoAbuGarcia from "../../public/images/logoAbuGarcia.webp";
import logoBeast from "../../public/images/logo-beast.webp";
import logoRedfish from '../../public/images/Logo-Redfish.webp';
import logoMarine from "../../public/images/logo-marine.webp";
import logoRapala from "../../public/images/logo-rapala.webp";
import logoTopFishing from '../../public/images/logo-topFishing.webp'
import logoKastKing from '../../public/images/logo-kastking.webp'


import "../App.css";

const Detalle = ({ products }) => {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const { onAddProduct } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [index, setIndex] = useState(0);
  const [markedIndex, setMarkedIndex] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    const foundProduct = products.find(item => item.codigo === codigo);
    if (foundProduct) {
      const productData = {
        ...foundProduct,
        imagenes: [foundProduct.imagen1_url, foundProduct.imagen2_url, foundProduct.imagen3_url].filter(Boolean),
        descripcion: Array.isArray(foundProduct.descripcion) ? foundProduct.descripcion : JSON.parse(foundProduct.descripcion)
      };
      setProduct(productData);
    }
  }, [codigo, products]);

  const handleScrollToTop = () => {
    scroll.scrollToTop({
      smooth: true,
      duration: 500,
    });
  };

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

  const changeIndex = (newIndex) => {
    setIndex(newIndex);
  };

  const markImage = (newIndex) => {
    setMarkedIndex(newIndex);
    setIndex(newIndex);
  };

  const enviarMensajeWhatsApp = (codigo, nombre) => {
    const telefono = "3755561156";
    const mensaje = `Hola, quiero cotizar el envio de este producto. Código: ${codigo}, Nombre: ${nombre}`;
    const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(mensaje)}`;
    window.open(enlaceWhatsApp, "_blank");
  };

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  const {
    nombre,
    precio,
    marca,
    stock,
    descripcion,
    codigo: productCodigo,
    imagenes
  } = product;

  const formattedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(precio);

  const logos = {
    caster: logoCaster,
    abugarcia: logoAbuGarcia,
    beast: logoBeast,
    redfish: logoRedfish,
    marine: logoMarine,
    rapala: logoRapala,
    topfishing: logoTopFishing,
    kastking:logoKastKing 
  };

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
          pb:'3rem'
        }}
      >
        <Typography
          variant="h6"
          textAlign={"start"}
          width={"90%"}
          fontSize={"1.4rem"}
          mt={"2rem"}
          textTransform={'capitalize'}
        >
          {nombre}
        </Typography>

        {marca && (
          <Typography
            variant="h6"
            textAlign={"start"}
            width={"90%"}
            mt={"1rem"}
            color={"gray"}
            fontWeight={"400"}
            sx={{ display: "flex", alignItems: "center" }}
          >
            Producto de :
            {logos[marca] ? (
              <img
                className="img-marca"
                src={logos[marca]}
                alt={`logo-${marca}`}
                style={{
                  marginLeft: "1rem",
                  height: "auto",
                  maxWidth: "5rem",
                  zIndex: 0,
                }}
              />
            ) : (
              <Typography sx={{ marginLeft: "1rem" }}>{marca}</Typography>
            )}
          </Typography>
        )}

        <Box sx={{ display: "flex", width: "90%", alignItems: "center" }}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            sx={{
              color:
                stock === "agotado"
                  ? "red"
                  : stock === "stock disponible" || stock === "nuevo ingreso"
                  ? "green"
                  : stock === "proximamente"
                  ? "blue"
                  : null,
            }}
            width={"90%"}
            mt={"1rem"}
            textTransform={"capitalize"}
          >
            {stock}!
          </Typography>
          <Typography variant="p" color={"gray"} marginTop={" 1rem"}>
            Cod:{productCodigo}
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
            {stock === "agotado" && (
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
            )}
            <img
              src={imagenes[index]}
              loading="lazy"
              style={{
                width: "100%",
                boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.5)",
              }}
              alt={nombre}
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
            {imagenes.map((img, i) => (
              <img
                className="imagen-miniatura"
                loading="lazy"
                src={img}
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
                alt={nombre}
              />
            ))}
          </Box>
        </Box>

        <Typography variant="h4" width={"90%"} mt={"2rem"} textAlign={"start"}>
          {formattedPrice}
        </Typography>
        {stock === "stock disponible" || stock === "nuevo ingreso" ? (
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
            {descripcion.map((desc, i) => (
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
              enviarMensajeWhatsApp(productCodigo, nombre)
            }
          >
            Click Aca
          </Button>
        </Typography>
 
      </Box>
    </Box>
  );
};

export default Detalle;
