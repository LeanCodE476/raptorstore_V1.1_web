import { Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import logoAbuGarcia from "../../public/images/logoAbuGarcia.webp";
import { CartContext } from "../Contexts/CartContext";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SearchIcon from "@mui/icons-material/Search";
import "../App.css";

const CardProductos = ({ product }) => {
  const { onAddProduct } = useContext(CartContext);
  const {
    nombre = "",
    precio = 0,
    codigo = "",
    imagenes = [],
    marca,
    stock,
  } = product || {};
  const navigate = useNavigate();

  const handleVerDetallesClick = () => {
    navigate(`/detalle/${codigo}`);
  };
  const formattedPrice = precio.toFixed(3);

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
  const logos = {
    abugarcia: logoAbuGarcia,
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          alignItems: "center",
          height: "auto",
          width: "95%",
          pb: "1rem",
          bgcolor: "white",
          borderRadius: ".5rem .5rem 0rem 0rem",
          boxShadow: `
          0px 4px 8px rgba(0, 0, 0, 0.25),
          0px 0px 2px rgba(0, 0, 0, 0.12)
           `,
          borderBottom: "2px solid #FF0000",
          borderTop: "2px solid #FF0000",
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography color={"#CACFD2"} fontSize={"80%"}>
              {codigo}
            </Typography>
            {marca === "caster" ? (
              <Typography
                className="brand-caster brand-caster-color"
                fontFamily={"Days One"}
                fontSize={'.8rem'}
              >
                CASTER
              </Typography>
            ) : null}
            {marca === "beast" ? (
              <Typography className="brand-beast-color">Beast</Typography>
            ) : null}
            {marca && logos[marca] ? (
              <img
                className="img-marca"
                src={logos[marca]}
                alt={`logo-${marca}`}
                style={{
                  height: "auto",
                  maxWidth: "2.5rem",
                  zIndex: 2,
                }}
              />
            ) : null}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "transform 0.2s",
            position: "relative",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
          onClick={handleVerDetallesClick}
        >
          <SearchIcon
            sx={{
              position: "absolute",
              bgcolor: "black",
              color: "white",
              p: ".3rem",
              fontSize: "1.5rem",
              borderRadius: ".5rem",
              top: ".5rem",
              right: ".5rem",
            }}
            onClick={handleVerDetallesClick}
          />
          <Typography
            sx={{
              fontSize: ".7rem",
              position: "absolute",
              bottom: "0rem",
              bgcolor: "white",
              color:
                product.stock === "Agotado"
                  ? "red"
                  : product.stock === "stock disponible"
                  ? "green" : product.stock === "proximamente" ? "blue"
                  : null,
              right: "0rem",
              fontWeight: "500",
              p: ".2rem",
              paddingRight: "1rem",
              borderRadius: " .5rem 0 0 0",
              textTransform: "capitalize",
            }}
          >
            {product.stock}
          </Typography>
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
            src={`/images/${imagenes[0]}`}
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
            height: "5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          <Typography
            variant="p"
            sx={{
              mt: "1rem",
              fontSize: ".9rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: "BOLD",
            }}
          >
            {nombre}
          </Typography>
          <Typography
            variant="p"
            fontSize={"1.2rem"}
            mt={".5rem"}
            fontWeight={"500"}
            textAlign={"start"}
          >
            ${formattedPrice}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "90%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            gap: ".5rem",
            mt: "0rem",
          }}
        >
          <Box
            sx={{
              height: "2rem",
              maxWidth: "7rem",
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
              sx={{ fontWeight: "bold", margin: "1rem", fontSize: "1rem" }}
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

          <Button
            disabled={product.stock === "Agotado" || product.stock === "proximamente33"}
            sx={{
              bgcolor: "#1F1F1F",
              color: "white",
              height: "2rem",
              width: "100%",
              borderRadius: ".3rem",
              fontWeight: "bold",
              fontSize: "70%",
              textTransform: "capitalize",
              boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.5)",
              mt: ".3rem",
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
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CardProductos;
