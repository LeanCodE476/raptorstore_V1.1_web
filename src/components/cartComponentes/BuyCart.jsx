import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";

import { CartContext } from "../../Contexts/CartContext";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
const BuyCart = () => {
  const { cart, total,cleanCart } = useContext(CartContext);
  function enviarMensajeWhatsapp() {
    const numeroTelefono = "3755 503038";

    let mensaje = `Hola, me gustaría comprar los siguientes productos:\n \n`;

    cart.forEach((producto, index) => {
      mensaje += `${index + 1}. Código: *${producto.codigo}* \n- ${
        producto.nombre
      } \n- Cantidad: ${
        producto.cantidad
      } \n- PrecioUnitario: $${formattedPrice(producto.precio)}\n`;
    });

    // Agregar el total al mensaje con un salto de línea
    mensaje += `\n*Total: $${formattedPrice(total)}*`;

    // Generar el enlace de WhatsApp con el número de teléfono y el mensaje
    const enlaceWhatsapp = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(
      mensaje
    )}`;

    // Abrir el enlace en una nueva pestaña
    window.open(enlaceWhatsapp);
  }

  const formattedPrice = (precio) => {
    return precio.toFixed(3);
  };
  return (
    <Box
      sx={{
        width: "23rem",
        borderTop: "1px solid #CACFD2  ",
        height: "10rem",
        position: "absolute",
        bottom: "0rem",
        left: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        "@media (max-width: 410px)": {
          width: "90%",
          borderTop: "1px solid #CACFD2  ",
          height: "10rem",
          position: "absolute",
          bottom: "0rem",
          left: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        },
      }}
    >
      <Button
        sx={{
          position: "absolute",
          bgcolor: "black",
          color: "white",
          bottom: "11rem",
          fontSize:'.7rem'
        }}
        onClick={()=>cleanCart()}
        className="button-clean-cart"
      >
        {" "}
        Vaciar carrito <RemoveShoppingCartIcon />
      </Button>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          mt: "-1rem",
        }}
      >
        <Typography fontWeight={"bold"} fontSize={"1.2rem"} color={"gray "}>
          Total
        </Typography>
        <Typography  fontSize={"1.2rem"} fontWeight={'500'} >
          ${total.toFixed(3)}
        </Typography>
      </Box>
      <Button
        sx={{
          bgcolor: "#09b90f",
          color: "white",
          borderRadius: ".5rem",
          textTransform: "capitalize",
        }}
        onClick={() => enviarMensajeWhatsapp()}
      >
        Comprar Carrito <WhatsAppIcon sx={{ marginLeft: "1rem" }} />
      </Button>
    </Box>
  );
};

export default BuyCart;
