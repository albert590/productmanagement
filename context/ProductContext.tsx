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
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
} from "@/services/api";


interface ProductContextType {

  products: Product[];

  loading: boolean;

  createProduct: (
    product: Omit<Product, "_id">
  ) => Promise<void>;

  updateProduct: (
    id: string,
    product: Partial<Product>
  ) => Promise<void>;

  deleteProduct: (
    id: string
  ) => Promise<void>;

}


const ProductContext =
  createContext<ProductContextType | undefined>(
    undefined
  );



export function ProductProvider({
  children,
}: {
  children: ReactNode;
}) {


  const [products, setProducts] =
    useState<Product[]>([]);


  const [loading, setLoading] =
    useState(true);



  async function loadProducts() {

    try {

      const data = await getProducts();

      setProducts(data);

    } catch(error) {

      console.error(
        "Loading products failed",
        error
      );

    } finally {

      setLoading(false);

    }

  }



  useEffect(() => {

    loadProducts();

  }, []);




  async function createProduct(
    product: Omit<Product, "_id">
  ) {

    const newProduct =
      await apiCreateProduct(product);


    setProducts((prev) => [
      ...prev,
      newProduct,
    ]);

  }





  async function updateProduct(
    id: string,
    product: Partial<Product>
  ) {


    const updatedProduct =
      await apiUpdateProduct(
        id,
        product
      );


    setProducts((prev) =>
      prev.map((item) =>
        item._id === id
          ? updatedProduct
          : item
      )
    );

  }





  async function deleteProduct(
    id: string
  ) {


    await apiDeleteProduct(id);


    setProducts((prev) =>
      prev.filter(
        (item) =>
          item._id !== id
      )
    );

  }





  return (

    <ProductContext.Provider

      value={{
        products,
        loading,
        createProduct,
        updateProduct,
        deleteProduct,
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