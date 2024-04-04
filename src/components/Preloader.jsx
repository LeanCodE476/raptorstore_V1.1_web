import { Box, Typography } from "@mui/material";

import { RingLoader } from "react-spinners";
import logoRaptor from '../../public/images/logoRaptor.png'
import '../App.css'
const Preloader = ({loading}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        bgcolor: "black",
        zIndex: "55",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:'column'
      }}
      className={!loading ? 'slide-out' : ''}
    >
    <Typography variant="h4" color={'white'} fontWeight={'bold'} fontSize={'3.5rem'}>Bienvenido</Typography>
    <Typography variant="h4" color={'white'} fontWeight={'bold'} fontSize={'3.5rem'} paddingBottom={'10rem'}>a</Typography>

       {<img src={logoRaptor} alt="logo-raptor"style={{width:'17rem',marginTop:'-6rem',position:'absolute'}} />}

      <RingLoader  color="red" size={150}  />
    </Box>
  );
};

export default Preloader;
