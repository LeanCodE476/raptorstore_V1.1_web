
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import reel from "../images/reelhuevomonster1.jpeg";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { CartContext } from "../Contexts/CartContext";
const Header = () => {
  const { cart,total,setTotal,contador,cleanCart,onDeleteProduct } = useContext(CartContext);
  const [open, setOpen] = useState(false);


  const formattedPrice = (precio) => {
    return precio.toFixed(3);
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        top: "0",
        width: "100%",
        height: "4rem",
        lineHeight: "4rem",
        fontSize: "1rem",
        zIndex: "9",
        color: "#FF0000",
        borderBottom: "1px solid #FF0000",
        position: "relative",
      }}
    >
      <h1 style={{ marginLeft: "1rem" }}>Raptor Store</h1>
      <ShoppingCartIcon
        sx={{ fontSize: "2rem", mr: "2rem", mt: "1rem", cursor: "pointer" }}
        onClick={() => setOpen(true)}
        className="icon-cart"
      />
    
        <span
          className="cart-count"
          style={{
            position: "absolute",
            top: ".2rem",
            right: "4rem",
            color: "white",
            padding: "0rem",
            display: "inline-block",
          }}
        >
          {contador}
        </span>
  
      <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "23rem",
            borderRadius: ".5rem",
            minHeight: "5rem",
            bgcolor: "white",
            position: "relative",
          }}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
            mt={"1rem"}
            pb={".5rem"}
          >
            Tu Carrito 
          </Typography>
          <CloseIcon
            sx={{
              position: "absolute",
              top: ".7rem",
              left: ".5rem",
              fontSize: "2rem",
              color: "red",
              cursor: "pointer",
            }}
            className="close-icon"
            onClick={() => setOpen(false)}
          />
          <hr />
          <Box
            sx={{
              overflowX: "auto",
              maxHeight: "30rem",
              paddingBottom: "1rem",
            }}
          >
            {" "}
            {cart.length > 0 ? (
              cart.map((productos) => (
                <>
                  <List
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={productos.imagen}
                      alt="prueba"
                      style={{
                        width: "3rem",
                        height: "2.5rem",
                        cursor: "pointer",
                        outline: "1px solid gray",
                        borderRadius: ".2rem",
                      }}
                    />
                    <Typography fontWeight={"bold"} fontSize={".8rem"}>
                      {productos.cantidad}
                    </Typography>
                    <Typography
                      sx={{
                        maxWidth: "8rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: ".9rem",
                      }}
                    >
                      {productos.nombre}
                    </Typography>
                    <Typography
                      fontWeight={"bold"}
                      fontSize={".8rem"}
                    >
                     $ {formattedPrice(productos.precio)}
                    </Typography>
                    <CloseIcon className="icon-delete-cart-item" onClick={()=>onDeleteProduct(productos)} />
                  </List>
                  <Divider />
                </>
              ))
            ) : (
              <Typography
                variant="h6"
                textAlign={"center"}
                fontWeight={"bold"}
                mt={"2rem"}
              >
                Tu carrito esta vacio :(
              </Typography>
            )}
          </Box>
        </Box>
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            bottom: "3.5rem",
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center",
            left: "0rem",
            right: "0rem",
          }}
        >
          Total:${total.toFixed(3)}
        </Typography>
        <Button
          sx={{
            bgcolor: "black",
            color: "white",
            borderRadius: "0rem",
            position: "absolute",
            bottom: "0rem",
            width: "100%",
          }}
          onClick={()=>cleanCart()}
        >
          Vaciar Carrito <RemoveShoppingCartIcon />
        </Button>
      </Drawer>
    </header>
  );
};

export default Header;
