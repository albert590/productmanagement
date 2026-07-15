import { Product, ProductsResponse } from "@/types/product";

const BASE_URL = "https://dummyjson.com/products";


// GET ALL PRODUCTS
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductsResponse = await response.json();

  return data.products;
}


// GET PRODUCT BY ID
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


// CREATE PRODUCT
export async function createProduct(
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
    throw new Error("Failed to create product");
  }


  return response.json();
}


// UPDATE PRODUCT
export async function updateProduct(
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


// DELETE PRODUCT
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