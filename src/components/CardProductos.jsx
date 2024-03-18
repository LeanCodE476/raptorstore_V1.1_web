import { Box, Button, Typography } from "@mui/material";
import reel from "../images/reel.jpeg";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
const CardProductos = ({ product }) => {
  const {
    nombre = "",
    precio = 0,
    codigo = "",
    imagenes = [],
  } = product || {};

  const navigate = useNavigate();

  const handleVerDetallesClick = () => {
    // Navegar al detalle del producto al hacer clic en "Ver Detalles"
    navigate(`/detalle/${codigo}`);
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
    borderBottom:'2px solid #FF0000',
    borderTop:'2px solid #FF0000'

    
        }}
      >
        <Typography variant="p" mt={".4rem"} ml={"-3rem"} color={"#CACFD2"}>
          Cod:{codigo}
        </Typography>
        <img
          src={reel || imagenes[0]}
          alt={nombre}
          style={{
            width: "90%",
            marginTop: ".5rem",
            aspectRatio: "4/3",
            boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.5)",
            borderRadius: ".5rem ",
          }}
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
              fontWeight:'BOLD'
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
            ${precio}
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
          Ver Detalles <VisibilityIcon sx={{ fontSize: "1.2rem",ml:'.5rem' }} />
        </Button>
      </Box>
    </>
  );
};

export default CardProductos;
