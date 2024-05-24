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
import Envios from "./components/Envios";
import Add from "./pages/Add"
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
    <BrowserRouter>
      <CartProvider>
        {/* Aplica los estilos de fondo a un elemento separado para mejor aislamiento */}
        <div className="contenedor-fondo">
          {loading ? (
            <Preloader loading />
          ) : (
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                
                <Route
                path="/detalle/:codigo"
                element={<Detalle products={products} />}
                />
                <Route path="/Envios" element={<Envios />} />
                <Route path="/add" element={<Add />} />

              </Routes>
              <Footer />
            </>
          )}
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

