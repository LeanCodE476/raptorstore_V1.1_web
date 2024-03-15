import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import logo from '../images/logoRaptor.jpeg'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
const SobreNosotros = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        sx={{ m: " 5rem 0 0 1rem", bgcolor: "black", color: "white", }}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon />
        Volver{" "}
      </Button>
      <Box
        sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          bgcolor: "white",
          padding: "2rem",
          textAlign: "center",
          maxWidth: "30rem",
          margin: "1rem auto",
          boxShadow:
            "20px 20px 60px rgba(191, 191, 191, 0.5), -20px -20px 60px white",
          borderRadius:'.3rem'
        }}
      >
        <Typography variant="h5" sx={{ pb: "2rem", fontWeight: "bold" }}>
          Que es raptor Store?
        </Typography>
        <Typography variant="p" sx={{fontSize:'1.4rem' }}>
          Raptor Store se creó con el objetivo de brindar a la comunidad de
          pesca y electrónica acceso a los mejores precios, así como ofrecer una
          amplia variedad de productos. Nuestra misión es acercar a los
          aficionados a la pesca y la tecnología las opciones más competitivas
          en el mercado, garantizando la satisfacción de nuestros clientes a
          través de una oferta diversificada y precios atractivos.
        </Typography>

        <img src={logo} alt="logo-raptor" style={{width:'15rem',marginTop:'3rem'}} />
        <Button sx={{bgcolor:'green',color:'white',textTransform:'capitalize'}}> Tenes mayorista? Contactanos <WhatsAppIcon sx={{ml:"1rem"}}/  ></Button>
      </Box>
    </>
  );
};

export default SobreNosotros;
