import { useContext, useState,useRef } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { CartContext } from "../Contexts/CartContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import logoRaptor from "../../public/images/logoRaptor.png";
import carritoVacio from "../../public/images/carritoVacio.png";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router-dom";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import '../App.css'

const Header = () => {
  const navigate = useNavigate();
  const { cart, total, contador, increaseItems, decreaseItems } =
    useContext(CartContext);
  const [open, setOpen] = useState(false);

  const formattedPrice = (precio) => {
    return precio.toFixed(3);
  };
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


  const [animationParent] = useAutoAnimate()
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        top: "0",
        width: "100%",
        height: "5rem",
        lineHeight: "4rem",
        fontSize: "1rem",
        zIndex: "9",
        color: "#FF0000",
        borderBottom: "2px solid #FF0000",
        position: "relative",
        backgroundColor: "black",
      }}
    >
      <img
        src={logoRaptor}
        alt="logo raptor store"
        style={{ height: "4rem", marginLeft: "2rem", cursor: "pointer" }}
        onClick={() => navigate("/")}
      />
      <ShoppingCartIcon
        sx={{ fontSize: "2rem", mr: "2rem", mt: ".3rem", cursor: "pointer" }}
        onClick={() => setOpen(true)}
        className="icon-cart"
      />

      <Typography
        className="cart-count"
        style={{
          position: "absolute",
          top: "2rem",
          right: "4.3rem",
          color: "#ff0000",
          padding: "0rem",
          display: "inline-block",
          fontWeight: "bold",
        }}
      >
        {0 || contador}
      </Typography>
      <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "25rem",
            borderRadius: ".5rem",
            minHeight: "90vh",
            position: "relative",
          }}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
            mt={"1rem"}
            pb={".5rem"}
            fontWeight={"bold"}
          >
            Mi Carrito
          </Typography>
          <ArrowBackIosIcon
            sx={{
              position: "absolute",
              top: ".7rem",
              left: "1.6rem",
              fontSize: "2rem",
              color: "red",
              cursor: "pointer",
            }}
            className="close-icon"
            onClick={() => setOpen(false)}
          />
          <Typography sx={{position:'absolute',top:'2rem',right:'1rem',fontWeight:'bold',color:'#25d366'}}>{0 || contador} Productos</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflowY: "scroll",
              Height: "60vh",
              paddingBottom: "2rem",
              maskImage: "linear-gradient(white 93%,transparent)",
            
            }}
            ref={animationParent}

          >
            {" "}
            {cart.length > 0 ? (
              cart.map((productos, i) => (
                <>
                  <List
                    key={i}
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      borderRadius: ".5rem",
                      width: "90%",
                      height: "6rem",
                      mt: ".7rem",
                      bgcolor: "white",
                      boxShadow: `0 1px 2px rgba(0, 0, 0, 0.2)`,
                    }}
                  >
                    <img
                      src={`/images/${productos.imagen}`}
                      alt={productos.nombre}
                      style={{
                        width: "5rem",
                        height: "5rem",
                        cursor: "pointer",
                        outline: "1px solid #D7DBDD ",
                        borderRadius: ".2rem",
                      }}
                    />
                    <Box
                      sx={{
                        height: "4.5rem",
                        width: "12rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          maxWidth: "12rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: ".9rem",
                          fontWeight: "bold",
                        }}
                      >
                        {productos.nombre}
                      </Typography>{" "}
                      <Typography fontWeight={"bold"} fontSize={"1.2rem"}>
                        $ {formattedPrice(productos.precio)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        height: "5rem",
                        width: "1.5rem",
                        borderRadius: "1rem",
                        bgcolor: "#E5E7E9 ",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 1px 2px rgba(0, 0, 0, .6)`,
                      }}
                    >
                      <IconButton
                        sx={{ width: "1.3rem", height: "1.3rem" }}
                        onClick={() => increaseItems(productos)}
                      >
                        <AddIcon
                          sx={{ color: "#ff0000", fontSize: "1.3rem" }}
                        />
                      </IconButton>

                      <Typography sx={{ fontWeight: "bold" }}>
                        {productos.cantidad}
                      </Typography>
                      <IconButton
                        sx={{ width: "1.3rem", height: "1.3rem" }}
                        onClick={() => decreaseItems(productos)}
                      >
                        <RemoveIcon
                          sx={{ color: "#ff0000", fontSize: "1.3rem" }}
                        />
                      </IconButton>
                    </Box>
                  </List>
                </>
              ))
            ) : (
              <>
                <img
                  src={carritoVacio}
                  alt="carrito-vacio"
                  style={{ width: "10rem", marginTop: "14rem" }}
                />
                <Typography
                  variant="h6"
                  textAlign={"center"}
                  mt={"2rem"}
                  color={"gray"}
                >
                  Carrito Vacío
                </Typography>
              </>
            )}
          </Box>
        </Box>
        {cart.length > 0 ? (
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
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                mt: "-1rem",
              }}
            >
              <Typography
                fontWeight={"bold"}
                fontSize={"1.2rem"}
                color={"gray "}
              >
                Total
              </Typography>
              <Typography fontWeight={"bold"} fontSize={"1.2rem"} color={'#25d366'}>
                ${total.toFixed(3)}
              </Typography>
            </Box>
            <Button
              sx={{
                bgcolor: "#25d366",
                color: "white",
                borderRadius: ".5rem",
                textTransform: "capitalize",
              }}
              onClick={() => enviarMensajeWhatsapp()}
            >
             Comprar Carrito <WhatsAppIcon sx={{ marginLeft: "1rem" }} />
            </Button>
          </Box>
        ) : null}
      </Drawer>
    </header>
  );
};

export default Header;
