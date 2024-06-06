import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { supabase } from "../supabaseClient";

export const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [contador, setContador] = useState(0);

  const cleanCart = () => {
    setCart([]);
    setTotal(0);
    setContador(0);
    localStorage.removeItem("cart");
    localStorage.removeItem("total");
    localStorage.removeItem("contador");
  };

  const onDeleteProduct = (product) => {
    const results = cart.filter((item) => item.codigo !== product.codigo);
    const newTotal = total - product.precio * product.cantidad;
    const newContador = contador - product.cantidad;

    setTotal(newTotal >= 0 ? newTotal : 0);
    setContador(newContador >= 0 ? newContador : 0);
    setCart(results);

    saveToLocalStorage(results, newTotal >= 0 ? newTotal : 0, newContador >= 0 ? newContador : 0);

    enqueueSnackbar("Se eliminó un producto del carrito", {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const onAddProduct = (items) => {
    const { codigo, nombre, precio, imagen1_url } = items;
  
    const nombreArray = nombre.split(" ");
    const nombreProducto = nombreArray.slice(0, 1).join(" ");
  
    if (cart.find((item) => item.codigo === codigo)) {
      const products = cart.map((item) =>
        item.codigo === codigo
          ? { ...item, cantidad: item.cantidad + items.cantidad }
          : item
      );
      setTotal(total + items.precio * items.cantidad);
      setContador(contador + items.cantidad);
      saveToLocalStorage(
        products,
        total + items.precio * items.cantidad,
        contador + items.cantidad
      );
      return setCart([...products]);
    }
    setTotal(total + items.precio * items.cantidad);
    setContador(contador + items.cantidad);
    setCart((prevCart) => [
      ...prevCart,
      {
        codigo,
        cantidad: items.cantidad,
        nombre,
        precio,
        imagen: imagen1_url,
      },
    ]);
    saveToLocalStorage(
      [
        ...cart,
        {
          codigo,
          cantidad: items.cantidad,
          nombre,
          precio,
          imagen: imagen1_url,
        },
      ],
      total + items.precio * items.cantidad,
      contador + items.cantidad
    );
    enqueueSnackbar(`Se agregó ${nombreProducto} al carrito :D`, {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
    checkForOutOfStockProducts([...cart, {
      codigo,
      cantidad: items.cantidad,
      nombre,
      precio,
      imagen: imagen1_url,
    }]);
  };
  
  const decreaseItems = (product) => {
    if (product.cantidad === 1) {
      onDeleteProduct(product);
    } else {
      const updatedCart = cart.map((item) =>
        item.codigo === product.codigo
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      );
      setCart(updatedCart);
      setTotal(total - product.precio);
      setContador(contador - 1);
      saveToLocalStorage(updatedCart, total - product.precio, contador - 1);
    }
  };

  const increaseItems = (product) => {
    const updatedCart = cart.map((item) =>
      item.codigo === product.codigo
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    );
    setCart(updatedCart);
    setTotal(total + product.precio);
    setContador(contador + 1);
    saveToLocalStorage(updatedCart, total + product.precio, contador + 1);
  };

  const checkForOutOfStockProducts = async (updatedCart = cart) => {
    try {
      const { data, error } = await supabase.from("products").select("codigo, stock");
      if (error) throw error;

      const outOfStockProducts = data.filter(product => product.stock === "agotado");

      if (outOfStockProducts.length > 0) {
        const newCart = updatedCart.filter(cartItem =>
          !outOfStockProducts.some(product => product.codigo === cartItem.codigo)
        );
        const newTotal = newCart.reduce((total, item) => total + item.precio * item.cantidad, 0);
        const newContador = newCart.reduce((count, item) => count + item.cantidad, 0);

        setCart(newCart);
        setTotal(newTotal);
        setContador(newContador);

        saveToLocalStorage(newCart, newTotal, newContador);

        if (newCart.length !== updatedCart.length) {
          enqueueSnackbar("Algunos productos se agotaron y fueron eliminados del carrito", {
            variant: "warning",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error checking for out-of-stock products:", error);
    }
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    const storedTotal = JSON.parse(localStorage.getItem("total"));
    const storedContador = JSON.parse(localStorage.getItem("contador"));
    if (storedCart) setCart(storedCart);
    if (storedTotal) setTotal(storedTotal);
    if (storedContador) setContador(storedContador);

    checkForOutOfStockProducts(storedCart || []);
  }, []);

  const saveToLocalStorage = (cart, total, contador) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", JSON.stringify(total));
    localStorage.setItem("contador", JSON.stringify(contador));
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
        onAddProduct,
        decreaseItems,
        increaseItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };
