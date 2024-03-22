import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  return (
    <header
      style={{
        top: "0",
        width: "100%",
        height: "4rem",
        lineHeight: "4rem",
        fontSize: "1rem",
        zIndex: "9",
        color: "#FF0000",
        borderBottom: "1px solid #FF0000",
        position: "relative",
      }}
    >
      <p
        style={{
          position: "absolute",
          top: "1rem",
          left: ".5rem",
          fontSize: ".8rem",
          fontWeight: "bold",
        }}
      >
        V1.0
      </p>
      <h1>Raptor Store</h1>



  
    </header>
  );
};

export default Header;
