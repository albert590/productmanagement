"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Product } from "@/types/product";

const CART_STORAGE_KEY = "weekly-product-management-cart";

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

function loadCartFromStorage(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const item = window.localStorage.getItem(CART_STORAGE_KEY);
    return item ? (JSON.parse(item) as Product[]) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(cart: Product[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // ignore write errors
  }
}

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<Product[]>(() => loadCartFromStorage());

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  function addToCart(product: Product) {
    setCart((previousCart) => [...previousCart, product]);
  }

  function removeFromCart(id: number) {
    setCart((previousCart) => {
      const idx = previousCart.findIndex((item) => item.id === id);
      if (idx === -1) return previousCart;
      const next = [...previousCart];
      next.splice(idx, 1);
      return next;
    });
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
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within CartProvider"
    );
  }

  return context;
}
