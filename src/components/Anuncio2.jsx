import { Box, Typography } from "@mui/material";
import argentina from "../assets/images/logo-argentina.png";
import ship from "../assets/images/logo-shipping.png";

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
      bgcolor={'white'}
   
    >
      <Typography
        variant="h5"
        textAlign={"center"}
        pt={"1rem"}
        pb={".3rem"}
        fontWeight={"bold"}
        borderBottom={"1px solid gray"}
      >
        <img src={ship} style={{ width: "2rem" }} alt="logo-ship" /> Envios a
        todo el Pais{" "}
        <img
          src={argentina}
          style={{ width: "3rem", marginBottom: "-.8rem" }}
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
        <Typography fontWeight={"bold"} color={"#52BE80 "}>
          Efectivo
        </Typography>
        <Typography fontWeight={"bold"} color={"#D4AC0D  "}>
          Bitcoin
        </Typography>
        <Typography fontWeight={"bold"} color={"green"}>
          Usdt
        </Typography>
      </Box>
    </Box>
  );
};

export default Anuncio2;
