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



  useEffect(() => {

    async function loadProducts() {

      try {

        console.log("Fetching products...");

        const data = await getProducts();

        console.log("API RESPONSE:", data);


        setProducts(data);


      } catch (error) {

        console.error(
          "API ERROR:",
          error
        );


      } finally {

        console.log("Finished loading");

        setLoading(false);

      }

    }


    loadProducts();


  }, []);





  async function createProduct(
    product: Omit<Product, "id">
  ) {

    const newProduct =
      await apiCreateProduct(product);


    setProducts((prev) => [
      ...prev,
      newProduct,
    ]);

  }





  async function updateProduct(
    id:number,
    product:Partial<Product>
  ){

    const updated =
      await apiUpdateProduct(
        id,
        product
      );


    setProducts((prev)=>
      prev.map((item)=>
        item.id === id
        ? updated
        : item
      )
    );

  }





  async function deleteProduct(
    id:number
  ){

    await apiDeleteProduct(id);


    setProducts((prev)=>
      prev.filter(
        item=>item.id !== id
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





export function useProducts(){

  const context =
    useContext(ProductContext);


  if(!context){

    throw new Error(
      "useProducts must be used inside ProductProvider"
    );

  }


  return context;

}