import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import Home from "./components/Home";
import Detalle from "./components/Detalle";
import products from "./productos.json";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartProvider from "./Contexts/CartContext";
import Preloader from "./components/Preloader";
import InstagramIcon from "@mui/icons-material/Instagram";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos con un temporizador
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={
        {
          //  backgroundColor: "#1B2631"
        }
      }
    >
      {loading ? (
        <Preloader loading />
      ) : (
        // <BrowserRouter>
        //   <CartProvider>
        //     <Header />
        //     <Routes>
        //       <Route path="/" element={<Home />} />
        //       <Route
        //         path="/detalle/:codigo"
        //         element={<Detalle products={products} />}
        //       />
        //     </Routes>
        //     <Footer />
        //   </CartProvider>
        // </BrowserRouter>
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            color: "white",
          }}
        >
          {" "}
          <h2
            style={{
              textAlign: "center",
              width: "18rem",
              fontSize: "2rem",
            }}
          >
            La pagina se encuentra en reparacion :D
            <hr style={{ marginTop: "1rem" }} />
            <p style={{ marginTop: "1rem" }}> Nuestro instagram</p>
            <Button
              sx={{
                color: "#ff0000",
                fontSize: ".9rem",
                textTransform: "lowercase",
              }}
              href="https://www.instagram.com/raptor_store_argentina/?hl=es"
              target="blank"
            >
              <InstagramIcon
                sx={{
                  paddingRight: "1rem",
                  fontSize: "5rem",
                  "@media (max-width: 375px)": {
                    fontSize: "1rem",
                    paddingRight: "0rem",
                  },
                }}
              />
              raptorstore
            </Button>
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;
