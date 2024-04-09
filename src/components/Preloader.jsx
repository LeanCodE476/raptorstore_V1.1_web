import { Box, Typography } from "@mui/material";

import { SyncLoader  } from "react-spinners";
import logoRaptor from '../../public/images/logoRaptor.webp'
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
    <Typography variant="h4" color={'white'} fontWeight={'bold'} fontSize={'3.5rem'}>Bienvenido</Typography>
    <Typography variant="h4" color={'white'} fontWeight={'bold'} fontSize={'3.5rem'} paddingBottom={'10rem'}>a</Typography>

       {<img src={logoRaptor} alt="logo-raptor"style={{width:'17rem',marginTop:'5.5rem',position:'absolute'}} />}

      <SyncLoader color="red" size={30}  />
    </Box>
  );
};

export default Preloader;
