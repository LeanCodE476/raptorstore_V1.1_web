import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import usdt from '../images/usdt.png';
import bitcoin from '../images/bitcoin.png';
import pagoefectivo from '../images/pagoefectivo.png'
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer
      style={{
        minHeight: "6rem",
        backgroundColor: "white",
        borderTop: "1px solid gray",
        textAlign: "center",
        paddingBottom:'1rem',
        outline:'1px solid red',
        position:'relative',
        bottom:'-5rem',
        overflowY:'hidden'
      }}
    >
      
      <Button
        sx={{
          color: "black",
          marginTop: "1rem",
          fontSize: "1.3rem",
          display: "inline-block",
          padding: ".3rem",
          borderRadius: ".5rem",
          textTransform: "capitalize",
          fontWeight: "700",
        }}
        onClick={() => navigate("/sobrenosotros")}
      >
        Que es Raptor Store?
      </Button>
     
      <Box>
        <Typography variant="h6" sx={{fontSize:'1.3rem',color:"#515A5A "}}>Metodos de Pago</Typography>
        <Box sx={{display:'flex',justifyContent:'space-around',width:'30rem',m:'1rem auto',flexWrap:'wrap'}}>
        
        <img src={usdt} alt="foto-usdt" style={{width:'1rem',height:'2rem'}} />
        <img src={bitcoin} alt="foto-bitcoin" style={{width:'1rem',height:'2rem'}} />
        <img src={pagoefectivo} alt="foto efectivo" style={{width:'1rem',height:'2rem'}} />
        <Typography variant="h6" sx={{fontSize:'1rem',lineHeight:'2.7rem',bgcolor:'black',color:'white',p:' 0 .5rem 0 .5rem',borderRadius:' .5rem 0 .5rem 0'}}>Transferencias</Typography>


        </Box>

      </Box>
      <p style={{ marginTop: "1rem" }}>
        Todos los derechos reservados ©RaptorStore
      </p>
    </footer>
  );
};

export default Footer;
