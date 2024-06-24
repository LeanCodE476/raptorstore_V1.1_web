import { Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import logoAbuGarcia from "../../public/images/logoAbuGarcia.webp";
import logoRedfish from "../../public/images/Logo-Redfish.webp";
import logoMarine from "../../public/images/logo-marine.webp";
import logoRapala from "../../public/images/logo-rapala.webp";
import logoTopFishing from "../../public/images/logo-topFishing.webp";
import logoKastKing from "../../public/images/logo-kastking.webp";
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
    imagen1_url = "",
    imagen2_url = "",
    imagen3_url = "",
    marca,
    stock,
  } = product || {};
  const navigate = useNavigate();

  const handleVerDetallesClick = () => {
    navigate(`/detalle/${codigo}`);
  };

  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(precio);

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
    redfish: logoRedfish,
    marine: logoMarine,
    rapala: logoRapala,
    topfishing: logoTopFishing,
    kastking: logoKastKing,
  };

  const stockText = stock || "Sin información";
  const stockColor =
    stock === "agotado"
      ? "red"
      : stock === "stock disponible" || stock === "nuevo ingreso"
      ? "green"
      : stock === "proximamente"
      ? "blue"
      : "black";

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
            <Typography color={"#CACFD2"} fontSize={"60%"}>
              {codigo}
            </Typography>
            {marca === "caster" && (
              <Typography
                className="brand-caster brand-caster-color"
                fontFamily={"Days One"}
                fontSize={".8rem"}
                zIndex={"3"}
              >
                CASTER
              </Typography>
            )}
            {marca === "beast" && (
              <Typography className="brand-beast-color">Beast</Typography>
            )}
            {marca && logos[marca] && (
              <img
                className="img-marca"
                src={logos[marca]}
                alt={`logo-${marca}`}
                style={{
                  height: "auto",
                  maxWidth: marca === "topfishing" ? "2rem" : "5rem" || marca ==='abugarcia' ? '2rem' : '3rem',
                  zIndex: 2,
                }}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: ".7rem",
              position: "absolute",
              bottom: "0rem",
              bgcolor: stock === "nuevo ingreso" ? "green" : "white",
              color: stock === "nuevo ingreso" ? "white" : stockColor,
              right: "0rem",
              fontWeight: "500",
              p: ".2rem",
              paddingRight: "1rem",
              borderRadius: " .5rem 0 0 0",
              textTransform: "capitalize",
              borderTop: "1px solid green",
            }}
          >
            {stockText}
          </Typography>
          {product.stock === "agotado" && (
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
              cursor: "pointer",
            }}
            onClick={handleVerDetallesClick}
          />
          <img
            src={imagen1_url}
            loading="lazy"
            style={{
              width: "100%",
              boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.5)",
              cursor: "pointer",
            }}
            alt={nombre}
            className="imagen-detalle"
            onClick={handleVerDetallesClick}
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
          <Typography
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
            sx={{
              fontSize: "1.2rem",
              mt: ".5rem",
              fontWeight: "500",
              textAlign: "start",
            }}
          >
            {formattedPrice}
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
            disabled={stock === "agotado" || stock === "proximamente"}
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
