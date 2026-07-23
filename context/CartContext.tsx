"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Product } from "@/types/product";

import { useAuth } from "./AuthContext";

import {
  getCart,
  addToCart as addCartItem,
  removeFromCart,
} from "@/services/cart";


export interface CartItem {
  product: Product;
  quantity: number;
}


interface CartContextType {

  cart: CartItem[];

  addToCart: (
    product: Product
  ) => Promise<void>;

  removeItem: (
    productId: string
  ) => Promise<void>;

  refreshCart: () => Promise<void>;

}


const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );



export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {


  const [cart, setCart] =
    useState<CartItem[]>([]);


  const { user } = useAuth();



  async function refreshCart() {


    if (!user?._id) {

      setCart([]);

      return;

    }



    try {


      const data =
        await getCart(
          user._id
        );



      if (Array.isArray(data)) {

        setCart(data);

      } 
      else if (data?.items) {

        setCart(data.items);

      } 
      else {

        setCart([]);

      }



    } catch(error) {


      console.error(
        "Cart loading error:",
        error
      );


      setCart([]);

    }

  }





  async function addToCart(
    product: Product
  ) {


    if (!user?._id) {

      console.log(
        "Please login first"
      );

      return;

    }



    try {


      await addCartItem(

        user._id,

        String(product.id),

        1

      );



      await refreshCart();



    } catch(error) {


      console.error(
        "Add cart error:",
        error
      );


    }

  }





  async function removeItem(
    productId: string
  ) {


    if (!user?._id) {

      return;

    }



    try {


      await removeFromCart(

        user._id,

        productId

      );



      await refreshCart();



    } catch(error) {


      console.error(
        "Remove cart error:",
        error
      );


    }

  }





  useEffect(() => {


    if (user?._id) {

      refreshCart();

    }


  }, [user]);






  return (

    <CartContext.Provider

      value={{

        cart,

        addToCart,

        removeItem,

        refreshCart,

      }}

    >

      {children}

    </CartContext.Provider>

  );

}





export function useCart() {


  const context =
    useContext(
      CartContext
    );



  if (!context) {

    throw new Error(
      "useCart must be used within CartProvider"
    );

  }



  return context;

}