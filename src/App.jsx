import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa tus componentes
import Home from "./components/Home";
import Detalle from "./components/Detalle";
import products from "./productos.json";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React, { useState } from "react";

function App() {
  const CartContext = React.createContext();
  const [cart, setCart] = useState();

  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 42%, rgba(98,0,0,1) 100%)",
      }}
    >
      <BrowserRouter>
        <CartContext.Provider value={{ cart, setCart }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/detalle/:codigo"
              element={<Detalle products={products} />}
            />
          </Routes>
            <Footer />
       
        </CartContext.Provider>
      </BrowserRouter>
    </div>
  );
}
export default App;
