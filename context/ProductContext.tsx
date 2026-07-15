"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Product } from "@/types/product";

import {
  getProducts,
  deleteProduct,
  editProduct as updateProduct,
  addProduct as createProduct,
} from "@/services/productService";


type ProductContextType = {
  products: Product[];
  loading: boolean;

  addProduct: (
    product: Omit<Product, "id">
  ) => Promise<void>;

  editProduct: (
    id: number,
    product: Partial<Product>
  ) => Promise<void>;

  removeProduct: (
    id: number
  ) => Promise<void>;

  refreshProducts: () => Promise<void>;
};


const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);


export function ProductProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);



  // Load products
  const refreshProducts = async () => {

    try {

      setLoading(true);

      const data = await getProducts();

      setProducts(data);


    } catch (error) {

      console.error(
        "Error loading products:",
        error
      );


    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    refreshProducts();

  }, []);





  // Add product
  const addProduct = async (
    product: Omit<Product, "id">
  ) => {

    try {

      const newProduct =
        await createProduct(product);


      setProducts((prev) => [
        newProduct,
        ...prev,
      ]);


    } catch (error) {

      console.error(
        "Error adding product:",
        error
      );

      throw error;

    }

  };






  // Edit product
  const editProduct = async (
    id: number,
    product: Partial<Product>
  ) => {

    try {

      const updatedProduct =
        await updateProduct(
          id,
          product
        );


      setProducts((prev) =>
        prev.map((item) =>
          item.id === id
            ? updatedProduct
            : item
        )
      );


    } catch (error) {

      console.error(
        "Error updating product:",
        error
      );

      throw error;

    }

  };







  // Delete product
  const removeProduct = async (
    id: number
  ) => {

    try {

      await deleteProduct(id);


      setProducts((prev) =>
        prev.filter(
          (product) =>
            product.id !== id
        )
      );


    } catch (error) {

      console.error(
        "Error deleting product:",
        error
      );

      throw error;

    }

  };






  return (

    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        editProduct,
        removeProduct,
        refreshProducts,
      }}
    >

      {children}

    </ProductContext.Provider>

  );

}







export function useProducts() {

  const context =
    useContext(ProductContext);


  if (!context) {

    throw new Error(
      "useProducts must be used inside ProductProvider"
    );

  }


  return context;

}