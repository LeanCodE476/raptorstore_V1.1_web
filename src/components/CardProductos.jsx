import { Box, Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import { CartContext } from "../Contexts/CartContext";
import { useContext } from "react";
const CardProductos = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { nombre = "", precio = 0, codigo = "", imagenes = [] } = product || {};
  const navigate = useNavigate();

  const handleVerDetallesClick = () => {
    // Navegar al detalle del producto al hacer clic en "Ver Detalles"
    navigate(`/detalle/${codigo}`);
  };
  const formattedPrice = precio.toFixed(3);

  const addOnProduct = (items) => {

    const { codigo, nombre, precio, imagenes } = items;
   
    if(cart.find(item=>item.codigo === codigo)){

      const products=cart.map(item=>item.codigo === codigo ? {...item,cantidad:item.cantidad + 1} : item)
      return setCart([...products])
    }

    setCart(prevCart => [
      ...prevCart,
      {
        codigo,
        cantidad:1,
        nombre,
        precio,
        imagen: imagenes[0] 
      }
    ]);

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
          height: "auto",
          bgcolor: "white",
          pb: ".7rem",
          borderRadius: ".5rem .5rem 0rem 0rem",
          boxShadow: `
      0px 4px 8px rgba(0, 0, 0, 0.25),
      0px 0px 2px rgba(0, 0, 0, 0.12)
    `,
          borderBottom: "2px solid #FF0000",
          borderTop: "2px solid #FF0000",
        }}
      >
        <Typography mt={".4rem"} ml={"-3rem"} color={"#CACFD2"}>
          Cod:{codigo}
        </Typography>

        <img
          src={imagenes[0]}
          alt={nombre}
          style={{
            width: "90%",
            height: "auto",
            marginTop: ".5rem",
            aspectRatio: "4/3",
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

        <Button
          variant="contained"
          sx={{
            bgcolor: "#E5E7E9",
            color: "black",
            outline: "1px solid black",

            fontFamily: "Roboto",
            fontSize: ".8rem",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
          onClick={handleVerDetallesClick}
        >
          Ver Detalles{" "}
          <ArrowOutwardIcon sx={{ fontSize: "1.2rem", ml: ".5rem" }} />
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#1F1F1F",
            color: "white",
            outline: "1px solid black",
            marginTop: "1rem",
            fontFamily: "Roboto",
            fontSize: ".8rem",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
          onClick={() => addOnProduct(product)}
        >
          Agregar Al Carrito
          <AddShoppingCartIcon sx={{ fontSize: "1.2rem", ml: ".5rem" }} />
        </Button>
      </Box>
    </>
  );
};

export default CardProductos;
