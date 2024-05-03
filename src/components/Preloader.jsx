import { Box, Typography } from "@mui/material";

import { SyncLoader  } from "react-spinners";

import '../App.css'
const Preloader = ({loading}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        zIndex: "55",
        bgcolor:'black',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:'column'
      }}
      className={!loading ? 'slide-out' : ''}
    >
    <Typography variant="h4" color={'white'} fontWeight={'bold'} fontSize={'3.5rem'} mt={'-5rem' } textAlign={'center'}>Bienvenido <br /> a</Typography>

      <Typography variant="h2" color={'#ff0000'} textAlign={'center'} fontFamily={"Orbitron"} fontWeight={'800'} sx={{transform:'translate(0)'}}>Raptor Store</Typography>

       <Typography variant="h5" textAlign={'center'} color={'yellow'} mt={'1rem'}  fontWeight={'bold'} fontSize={'1.2rem'}>Envios Gratis apartir de $65.000!!</Typography>
      <SyncLoader color="red" size={20} style={{marginTop:'3rem'}} />
    </Box>
  );
};

export default Preloader;
