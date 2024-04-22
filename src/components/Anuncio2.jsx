import { Box, Typography } from "@mui/material";
import argentina from "../../public/images/logo-argentina.webp";
import ship from "../../public/images/logo-shipping.webp";

const Anuncio2 = () => {
  return (
    <Box
      m={"1.5rem auto"}
      height={"6rem auto"}
      width={"93%"}
      borderRadius={".8rem"}
      boxShadow={"0px 4px 5px 0px rgba(0,0,0,0.5)"}
      maxWidth={"30rem"}
      overflow={"hidden"}
      bgcolor={"black"}
      color={"#ff0000"}
      outline={"1px solid #FF0000"}
    >
      <Typography
        variant="h6"
        textAlign={"center"}
        pt={"1rem"}
        pb={".5rem"}
        fontWeight={"bold"}
        borderBottom={"1px solid gray"}
        color={"#ff0000"}
        textTransform={"uppercase"}
      >
        <img
          src={ship}
          style={{
            width: "2.5rem",
            filter: "invert(1)",
            paddingRight: ".5rem",
          }}
        />{" "}
        Envios a todo el Pais{" "}
        <img
          src={argentina}
          style={{
            width: "2.5rem",
            marginBottom: "-.8rem",
            filter: "invert(1)",
          }}

          className="logo-argentina"
        />
      </Typography>
      <Box
        height={"2rem"}
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={".9rem"}>
          Transferencias
        </Typography>
        <Typography fontWeight={"bold"} fontSize={".9rem"}>
          Efectivo
        </Typography>
        <Typography fontWeight={"bold"} fontSize={".9rem"}>
          Bitcoin
        </Typography>
        <Typography fontWeight={"bold"} fontSize={".9rem"}>
          Usdt
        </Typography>
      </Box>
    </Box>
  );
};

export default Anuncio2;
