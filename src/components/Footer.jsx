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
        backgroundColor: "black",
        borderTop: "1px solid #FF0000",
        textAlign: "center",
        paddingBottom: "1rem",
        outline: "1px solid red",
        position: "relative",
        bottom: "-5rem",
        overflowY: "hidden",
      }}
    ></footer>
  );
};

export default Footer;
