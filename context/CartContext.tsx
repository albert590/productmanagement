"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Product } from "@/types/product";

const CART_STORAGE_KEY =
  "weekly-product-management-cart";


export interface CartItem extends Product {
  quantity: number;
}


interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}



const CartContext = createContext<
  CartContextType | undefined
>(undefined);



function loadCartFromStorage(): CartItem[] {

  if (typeof window === "undefined") {
    return [];
  }


  try {

    const item =
      window.localStorage.getItem(
        CART_STORAGE_KEY
      );


    return item
      ? (JSON.parse(item) as CartItem[])
      : [];

  } catch {

    return [];

  }
}



function saveCartToStorage(
  cart: CartItem[]
) {

  if (typeof window === "undefined") {
    return;
  }


  try {

    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart)
    );

  } catch {

    // ignore storage errors

  }
}




export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {


  const [cart, setCart] =
    useState<CartItem[]>(
      () => loadCartFromStorage()
    );



  useEffect(() => {

    saveCartToStorage(cart);

  }, [cart]);




  function addToCart(product: Product) {


    setCart((previousCart) => {


      const existingProduct =
        previousCart.find(
          (item) =>
            item.id === product.id
        );



      if (existingProduct) {

        return previousCart.map(
          (item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
        );

      }



      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ];

    });

  }





  function removeFromCart(id: number) {


    setCart((previousCart) =>

      previousCart.filter(
        (item) =>
          item.id !== id
      )

    );

  }





  function clearCart() {

    setCart([]);

  }





  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}





export function useCart() {


  const context =
    useContext(CartContext);



  if (!context) {

    throw new Error(
      "useCart must be used within CartProvider"
    );

  }



  return context;

}