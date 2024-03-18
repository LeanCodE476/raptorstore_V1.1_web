import React, { useEffect, useState } from 'react';
import '../App.css';
import img from '../images/reel.jpeg'
function ImageSlider({ product }) {
  const [wordData, setWordData] = useState(product.imagenes[0]);
  const [val, setVal] = useState(0);

  const handleClick = (index) => {
    setVal(index);
    const wordSlider = product.imagenes[index];
    setWordData(wordSlider);
  };

  const handleNext = () => {
    let index = val < product.imagenes.length - 1 ? val + 1 : val;
    setVal(index);
    const wordSlider = product.imagenes[index];
    setWordData(wordSlider);
  };

  const handlePrevious = () => {
    let index = val <= product.imagenes.length - 1 && val > 0 ? val - 1 : val;
    setVal(index);
    const wordSlider = product.imagenes[index];
    setWordData(wordSlider);
  };

  return (
    <div className="main">
    {console.log(`../images/${product.imagenes[1]}`)}
        <img  src={`../images/${product.imagenes[]}`}  alt="imagen-prueba" />
    </div>
  );
}

export default ImageSlider;
