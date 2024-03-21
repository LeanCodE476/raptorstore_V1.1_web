import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa tus componentes
import Home from "./components/Home";
import Pesca from "./components/Pesca";
import Electronica from "./components/Electronica";

import Detalle from "./components/Detalle";
import products from "./productos.json";
import Footer from "./components/Footer";
import NavDesktop from "./components/NavDesktop";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/Header";
import { useState } from "react";

function App() {

  return (
    <div style={{background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)"}}>
      <BrowserRouter>
      <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pesca" element={<Pesca />} />
          <Route path="/electronica" element={<Electronica />} />
          <Route
            path="/detalle/:codigo"
            element={<Detalle products={products} />}
          />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}
export default App;
