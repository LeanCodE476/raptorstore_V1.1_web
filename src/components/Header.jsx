import { useContext, useEffect, useState } from "react";
import { Box, Drawer, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { CartContext } from "../Contexts/CartContext";
import { v4 as uuidv4 } from "uuid";

import logoRaptor from "../../public/images/logoRaptor.webp";
import carritoVacio from "../../public/images/carritoVacio.webp";
import { useNavigate } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "../App.css";
import ListItem from "./cartComponentes/ListItem";
import BuyCart from "./cartComponentes/BuyCart";

const Header = () => {
  const [cartPosition, setCartPosition] = useState("absolute");
  const navigate = useNavigate();
  const { cart, contador } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const [animationParent] = useAutoAnimate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setCartPosition("fixed");
      } else {
        setCartPosition("absolute");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header>
      <img
        src={logoRaptor}
        alt="logo raptor store"
        style={{ height: "4rem", marginLeft: "2rem", cursor: "pointer" }}
        onClick={() => navigate("/")}
      />
      <Box
        sx={{
          position: cartPosition,
          top: cartPosition === "absolute" ? "0.5rem" : "3.5rem",
          right: "1rem",
          zIndex: "2",
          width: "3rem",
          height: "3rem",
          bgcolor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1.9rem",
          borderRadius: "10rem",
          outline: "1px solid white",
        }}
        ref={animationParent}

      >
        <Typography
          style={{
            color: "#ff0000",
            fontWeight: "bold",
          }}
        >
          {0 || contador}
        </Typography>
        <ShoppingCartIcon
          sx={{ fontSize: "2rem", cursor: "pointer" }}
          onClick={() => setOpen(true)}
          className="icon-cart"
        />
      </Box>

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
          <Typography
            sx={{
              position: "absolute",
              top: "2rem",
              right: "1rem",
              fontWeight: "bold",
              color: "#25d366",
            }}
          >
            {0 || contador} Productos
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflowY: "scroll",
              height: "60vh",
              paddingBottom: "2rem",
              maskImage: "linear-gradient(white 93%,transparent)",
            }}
            ref={animationParent}
          >
            {" "}
            {cart.length > 0 ? (
              cart.map((productos) => (
                <>
                  <ListItem key={uuidv4()} productos={productos} />
                </>
              ))
            ) : (
              <>
                <img
                  src={carritoVacio}
                  alt="carrito-vacio"
                  style={{ width: "10rem", marginTop: "14rem" }}
                  loading='lazy'
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
        {cart.length > 0 ? <BuyCart /> : null}
      </Drawer>
    </header>
  );
};

export default Header;
