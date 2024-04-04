import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Detalle from "./components/Detalle";
import products from "./productos.json";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartProvider from "./Contexts/CartContext";
import Preloader from "./components/Preloader";

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
    <div style={{ backgroundColor: "#1B2631" }}>
      {loading ? (
        <Preloader loading />
      ) : (
        <BrowserRouter>
          <CartProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/detalle/:codigo"
                element={<Detalle products={products} />}
              />
            </Routes>
            <Footer />
          </CartProvider>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
