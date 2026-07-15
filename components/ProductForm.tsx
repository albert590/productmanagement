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
    product: Omit<Product, "id">
  ) => Promise<void>;

  updateProduct: (
    id: number,
    product: Partial<Product>
  ) => Promise<void>;

  deleteProduct: (
    id: number
  ) => Promise<void>;

}


const ProductContext = createContext<
  ProductContextType | undefined
>(undefined);



export function ProductProvider({
  children,
}: {
  children: ReactNode;
}) {


  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function loadProducts() {

      try {

        const data = await getProducts();

        setProducts(data);

      } catch (error) {

        console.error(
          "Failed to load products",
          error
        );

      } finally {

        setLoading(false);

      }

    }


    loadProducts();

  }, []);




  async function createProduct(
    product: Omit<Product, "id">
  ) {

    try {

      const newProduct =
        await apiCreateProduct(product);


      setProducts((previous) => [
        ...previous,
        newProduct,
      ]);


    } catch (error) {

      console.error(
        "Create product failed",
        error
      );

      throw error;

    }

  }




  async function updateProduct(
    id: number,
    product: Partial<Product>
  ) {


    try {

      const updatedProduct =
        await apiUpdateProduct(
          id,
          product
        );


      setProducts((previous) =>
        previous.map((item) =>
          item.id === id
            ? updatedProduct
            : item
        )
      );


    } catch (error) {

      console.error(
        "Update product failed",
        error
      );

      throw error;

    }

  }




  async function deleteProduct(
    id: number
  ) {


    try {

      await apiDeleteProduct(id);


      setProducts((previous) =>
        previous.filter(
          (item) =>
            item.id !== id
        )
      );


    } catch (error) {

      console.error(
        "Delete product failed",
        error
      );

      throw error;

    }

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