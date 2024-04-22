import { Box, Typography } from "@mui/material";
import caster from '../../public/images/logo-caster.webp'
import beast from '../../public/images/logo-beast.webp'
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
      maxWidth={"30rem"}
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
        Marcas Oficiales
      </Typography>
      <Box  mt={'1rem'} display={'flex'} justifyContent={'space-around'}>
        {" "}
        <img src={caster} alt="logo-caster" style={{width:'7rem'}} className="img-anuncio-1"/>
        <img src={beast} alt="logo-beast" style={{width:'7rem'}} className="img-anuncio-1"/>
      </Box>
    </Box>
  );
};

export default Anuncio1;
