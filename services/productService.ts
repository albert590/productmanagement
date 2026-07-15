import { Product, ProductsResponse } from "@/types/product";

const BASE_URL = "https://dummyjson.com/products";


export async function getProducts(): Promise<Product[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductsResponse = await response.json();

  return data.products;
}


export async function getProductById(
  id: number
): Promise<Product> {

  const response = await fetch(
    `${BASE_URL}/${id}`
  );

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return response.json();
}



export async function addProduct(
  product: Omit<Product, "id">
): Promise<Product> {

  const response = await fetch(
    `${BASE_URL}/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );


  if (!response.ok) {
    throw new Error("Failed to add product");
  }


  return response.json();
}



export async function editProduct(
  id: number,
  product: Partial<Product>
): Promise<Product> {

  const response = await fetch(
    `${BASE_URL}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );


  if (!response.ok) {
    throw new Error("Failed to update product");
  }


  return response.json();
}



export async function deleteProduct(
  id: number
): Promise<void> {

  const response = await fetch(
    `${BASE_URL}/${id}`,
    {
      method: "DELETE",
    }
  );


  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}