import { Box, Button, IconButton, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import logoCaster from "../../public/images/logo-caster.webp";
import logoAbuGarcia from "../../public/images/logoAbuGarcia.webp";
import logoBeast from "../../public/images/logo-beast.webp";
import { CartContext } from "../Contexts/CartContext";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../App.css";
const CardProductos = ({ product }) => {
  const { onAddProduct } = useContext(CartContext);
  const { nombre = "", precio = 0, codigo = "", imagenes = [] } = product || {};
  const navigate = useNavigate();

  const handleVerDetallesClick = () => {
    // Navegar al detalle del producto al hacer clic en "Ver Detalles"
    navigate(`/detalle/${codigo}`);
  };
  const formattedPrice = precio.toFixed(3);

  const logos = {
    caster: logoCaster,
    abugarcia: logoAbuGarcia,
    beast: logoBeast,
  };
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

  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "11.5rem",
          width:'100%',
          height: "auto",
          pb: "1.5rem",
          bgcolor: "white",
          borderRadius: ".5rem .5rem 0rem 0rem",
          boxShadow: `
          0px 4px 8px rgba(0, 0, 0, 0.25),
          0px 0px 2px rgba(0, 0, 0, 0.12)
           `,
          borderBottom: "2px solid #FF0000",
          borderTop: "2px solid #FF0000",

          // "@media (max-width: 410px)": {
          //   maxWidth: "9rem",
          // },
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "2rem",
            display: "flex",
            marginTop: ".5rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {" "}
          <Typography color={"#CACFD2"} fontSize={".8rem"}>
            {codigo}
          </Typography>
          {product.marca && logos[product.marca] && (
            <img
              className="img-marca"
              src={logos[product.marca]}
              alt={`logo-${product.marca}`}
              style={{
                width: "4rem",
              }}
              loading="lazy"
            />
          )}
        </Box>

        <img
          src={`/images/${imagenes[0]}`}
          alt={nombre}
          loading="lazy"
          style={{
            width: "90%",
            height: "auto",
            marginTop: "1rem",
            boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.5)",
            borderRadius: ".5rem ",
            cursor: "pointer",
          }}
          className="card-product-img"
          onClick={handleVerDetallesClick}
        />
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
              maxWidth: "11.5rem",
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
            fontWeight={"bold"}
            color={"#FF0000"}
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
              "@media (max-width: 410px)": {
                width: "4rem",
              },
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
              <RemoveIcon
                sx={{
                  color: "#424949 ",
                  fontSize: "1.6rem",
                  "@media (max-width: 410px)": { fontSize: "1rem" },
                }}
              />
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
              <AddIcon
                sx={{
                  color: "#424949  ",
                  fontSize: "1.6rem",
                  "@media (max-width: 410px)": { fontSize: "1rem" },
                }}
              />
            </IconButton>
          </Box>
          <IconButton
            sx={{
              bgcolor: "#1F1F1F",
              color: "white",
              width: "3rem",
              height: "2rem",
              borderRadius: ".3rem",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={handleAddToCart}
          >
            <AddShoppingCartIcon sx={{ fontSize: "1.2rem" }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default CardProductos;
