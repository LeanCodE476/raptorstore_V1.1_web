import { Box, Typography } from "@mui/material";
import argentina from "../../public/images/logo-argentina.webp";
import ship from "../../public/images/logo-shipping.webp";

const Anuncio2 = () => {
  return (
    <Box
      m={"1.5rem auto"}
      height={"6rem"}
      width={"93%"}
      borderRadius={".8rem"}
      boxShadow={"0px 4px 5px 0px rgba(0,0,0,0.5)"}
      maxWidth={"40rem"}
      overflow={"hidden"}
      bgcolor={"black"}
      color={"#ff0000"}
      outline={"1px solid #FF0000"}
    >
      <Typography
        variant="h5"
        textAlign={"center"}
        pt={"1rem"}
        pb={".5rem"}
        fontWeight={"bold"}
        borderBottom={"1px solid gray"}
        color={"#ff0000"}
        textTransform={"uppercase"}
        sx={{
          "@media (max-width: 375px)": {
            fontSize: "1.2rem",
          },
        }}
      >
        <img
          src={ship}
          style={{ width: "3rem", filter: "invert(1)", paddingRight: ".5rem" }}
          alt="logo-ship"
        />{" "}
        Envios a todo el Pais{" "}
        <img
          src={argentina}
          style={{ width: "3rem", marginBottom: "-.8rem", filter: "invert(1)" }}
          alt="logo-argentina"
        />
      </Typography>
      <Box
        height={"2rem"}
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"}>Transferencias</Typography>
        <Typography fontWeight={"bold"}>Efectivo</Typography>
        <Typography fontWeight={"bold"}>Bitcoin</Typography>
        <Typography fontWeight={"bold"}>Usdt</Typography>
      </Box>
    </Box>
  );
};

export default Anuncio2;
