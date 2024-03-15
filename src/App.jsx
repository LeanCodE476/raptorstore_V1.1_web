import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa tus componentes
import Home from "./components/Home";
import Pesca from "./components/Pesca";
import Electronica from "./components/Electronica";
import Header from "./components/Header";
import SobreNosotros from "./components/SobreNosotros";
import Detalle from "./components/Detalle";
import products from './productos.json'

function App() {
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pesca" element={<Pesca />} />
          <Route path="/electronica" element={<Electronica />} />
          <Route path="/sobrenosotros" element={<SobreNosotros />} />
          <Route path="/detalle/:codigo" element={<Detalle products={products} />} />
        </Routes>
        
      </BrowserRouter>
      
    </>
  );
}
export default App;
