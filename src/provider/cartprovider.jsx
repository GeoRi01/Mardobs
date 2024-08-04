import React, { createContext, useContext, useState } from "react";
import Toast from "react-native-toast-message";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    let itemAdded = false;
  
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.prod_id === item.prod_id
      );
  
      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        if (newQuantity > item.prod_stocks) {
          Toast.show({
            type: "error",
            text1: `${item.prod_name} is out of stock!`,
            position: "bottom",
            text1Style: {
              fontSize: 16,
            },
          });
          return prevCart;
        } else {
          itemAdded = true;
          return prevCart.map((cartItem) =>
            cartItem.prod_id === item.prod_id
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          );
        }
      } else {
        if (item.prod_stocks > 0) {
          itemAdded = true;
          return [...prevCart, { ...item, quantity: 1 }];
        } else {
          Toast.show({
            type: "error",
            text1: `${item.prod_name} is out of stock!`,
            position: "bottom",
            text1Style: {
              fontSize: 16,
            },
          });
          return prevCart;
        }
      }
    });
  
    return itemAdded;
  };
  

  const increaseQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.prod_id === itemId) {
          const newQuantity = item.quantity + 1;
          if (newQuantity > item.prod_stocks) {
            Toast.show({
              type: "error",
              text1: `${item.prod_name} is out of stock!`,
              position: "bottom",
              text1Style: {
                fontSize: 16,
              },
            });
            return item;
          } else {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.prod_id === itemId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.prod_id !== itemId));
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.prod_price * item.quantity,
      0
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
