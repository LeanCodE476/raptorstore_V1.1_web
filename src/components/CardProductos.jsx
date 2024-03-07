import { Box, Button, Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
const CardProductos = ({ url, price, stock, name, codigo }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "20rem",
            height: "auto",
            pb: "1rem",
            bgcolor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              bgcolor: "#C71F1F",
              color: "white",
              m: "1rem 0 0 -14rem",
              fontSize: ".7rem",
              fontWeight: "600",
            }}
            onClick={() => setOpen(false)}
          >
            Cerrar X{" "}
          </Button>
          <Typography variant="p" fontSize={"1.2rem"} mt={"1rem"}>
            {name}
          </Typography>
          <img
            src={url}
            alt={name}
            style={{ width: "100%", marginTop: ".5rem", aspectRatio: "4/3" }}
          />
          <Typography variant="p" fontSize={"1.2rem"} mt={".5rem"}>
            ${price}
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "black",
              outline: "1px solid black",
              mt: "1rem",
              fontSize: "1rem",
              p: ".3rem .5rem .3rem .5rem",
              fontFamily: "Roboto",
            }}
          >
            Ver Detalles{" "}
            <ArrowForwardIcon sx={{ ml: ".3rem", fontSize: "1.3rem" }} />
          </Button>
        </Box>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          alignItems: "center",
          width: "11.5rem",
          height: "auto",
          pb: "1.5rem",
          bgcolor: "white",
          borderRadius: ".5rem",
          boxShadow: `
      0px 4px 8px rgba(0, 0, 0, 0.25),
      0px 0px 2px rgba(0, 0, 0, 0.12)
    `,
        }}
      >
        <Typography
          variant="p"
          fontSize={".6rem"}
          sx={{
            margin: "1rem 0 0 -3.4rem",
            display: "block",
            fontSize: ".7rem",
          }}
        >
          Stock:{" "}
          <span style={{ color: stock ? "#00B51D" : "#888888" }}>
            {stock ? "Disponible" : "Sin stock"}
          </span>
        </Typography>
        <Typography
          variant="p"
          fontSize={".9rem"}
          mt={".5rem"}
          textAlign={"center"}
          fontWeight={"bold"}
          sx={{ height: "3rem" }}
        >
          {name}
        </Typography>
        <img
          src={url}
          alt={name}
          style={{ width: "100%", marginTop: ".5rem", aspectRatio: "4/3" }}
          onClick={() => setOpen(true)}
        />
        <Typography variant="p" fontSize={"1.2rem"} mt={".5rem"}>
          ${price}
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "black",
            outline: "1px solid black",
            mt: ".5rem",
            p: ".3rem .5rem .3rem .5rem",
            fontFamily: "Roboto",
            fontSize: ".8rem",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          Ver Detalles{" "}
          <ArrowForwardIcon sx={{ ml: ".3rem", fontSize: "1.3rem" }} />
        </Button>
        <Button
          variant="contained"
          disabled={!stock} // Deshabilita el botón cuando stock es false
          sx={{
            bgcolor: stock ? "#00B51D" : "#888888", // Cambia el color según stock
            color: "white",
            outline: "1px solid black",
            mt: ".5rem",
            p: ".3rem .5rem .3rem .5rem",
            fontFamily: "Roboto",
            fontSize: ".9rem",
            "&:hover": {
              backgroundColor: "white",
              color: stock ? "#00B51D" : "#888888", // Cambia el color al hacer hover según stock
              outline: `1px solid ${stock ? "#00B51D" : "#888888"}`, // Cambia el color del contorno al hacer hover según stock
            },
          }}
        >
          Comprar{" "}
          <WhatsAppIcon
            sx={{
              ml: ".3rem",
            }}
          />
        </Button>
        <Typography
          variant="p"
          sx={{
            position: "absolute",
            bottom: "0rem",
            left: ".6rem",
            fontSize: ".6rem",
            color: "gray",
          }}
        >
          Cod:{codigo}
        </Typography>
      </Box>
    </>
  );
};

export default CardProductos;
