import { Box, Typography } from "@mui/material";

const FormaPago = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", pb: "1rem" }}
      margin={'1rem auto'}
      width={"100%"}
      borderRadius={".8rem"}
      boxShadow={"0px 4px 5px 0px rgba(0,0,0,0.5)"}
    >
      <Typography
        variant="h6"
        color={"white"}
        textAlign={"center"}
        fontSize={"1.3rem"}
        pt={".5rem"}
        fontWeight={"bold"}
        fontStyle={"italic"}
      >
        Aceptamos Transferencias <span style={{color:'yellow'}}>/</span>  Efectivo
      </Typography>
      <Typography
        variant="h6"
        color={'white'}
        textAlign={"center"}
        fontSize={"1.3rem"}
        pt={".5rem"}
        fontStyle={"italic"}
        fontWeight={400}
      >
        Envios a todo el Pais!
      </Typography>
    </Box>
  );
};

export default FormaPago;
