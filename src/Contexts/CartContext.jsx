import React, { useState } from "react";
export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [contador, setContador] = useState(0);

  const cleanCart = () => {
    setCart([]);
    setTotal(0);
    setContador(0);
  };
  const onDeleteProduct = product => {
		const results = cart.filter(
			item => item.codigo !== product.codigo
		);

		setTotal(total - product.precio * product.cantidad);
		setContador(contador - product.cantidad);
		setCart(results);
	};

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        total,
        setTotal,
        contador,
        setContador,
        cleanCart,
        onDeleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
