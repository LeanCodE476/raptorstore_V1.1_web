import { useContext } from "react";
import { Box, IconButton, List, Typography } from "@mui/material";
import { CartContext } from "../../Contexts/CartContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ListItem = ({ productos }) => {
  const { increaseItems, decreaseItems } = useContext(CartContext);

  const formattedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(productos.precio);
  const productImage = productos.imagen || productos.imagen1_url || productos.imagen2_url || productos.imagen3_url;

  return (
    <List
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
        src={productImage}
        alt={productos.nombre}
        style={{
          width: "5rem",
          height: "5rem",
          cursor: "pointer",
          outline: "1px solid #D7DBDD ",
          borderRadius: ".2rem",
        }}
        className="image-cart"
      />
      <Box
        sx={{
          height: "4.5rem",
          width: "12rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "@media (max-width: 410px)": {
            width: "9rem",
          },
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
          {formattedPrice}
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
          <AddIcon sx={{ color: "#ff0000", fontSize: "1.3rem" }} />
        </IconButton>

        <Typography sx={{ fontWeight: "bold" }}>
          {productos.cantidad}
        </Typography>
        <IconButton
          sx={{ width: "1.3rem", height: "1.3rem" }}
          onClick={() => decreaseItems(productos)}
        >
          <RemoveIcon sx={{ color: "#ff0000", fontSize: "1.3rem" }} />
        </IconButton>
      </Box>
    </List>
  );
};

export default ListItem;
