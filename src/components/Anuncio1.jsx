import { Box, Typography } from "@mui/material";
import caster from '/assets/logo-caster.png'
import beast from '/assets/logo-beast.png'
const Anuncio1 = () => {
  return (
    <Box
      bgcolor={"black"}
      m={"1.5rem auto"}
      height={"6rem"}
      width={"93%"}
      borderRadius={".8rem"}
      boxShadow={"0px 4px 5px 0px rgba(0,0,0,0.5)"}
      outline={"1px solid #FF0000"}
      maxWidth={"40rem"}
    >
      <Typography
        variant="h5"
        color={"white"}
        textAlign={"center"}
        fontSize={"1.3rem"}
        pt={".5rem"}
              fontWeight={"bold"}
              fontStyle={'italic'}
      >
        Vendedor Oficial
      </Typography>
      <Box  mt={'1rem'} display={'flex'} justifyContent={'space-around'}>
        {" "}
        <img src={caster} alt="logo-caster" style={{width:'9rem'}} />
        <img src={beast} alt="logo-beast" style={{width:'9rem'}} />
      </Box>
    </Box>
  );
};

export default Anuncio1;
