const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ecommerce-api-week4-1.onrender.com";


// GET ALL PRODUCTS
export async function getProducts() {

  const response = await fetch(
    `${API_URL}/products`,
    {
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch products"
    );
  }

  return data;
}



// CREATE PRODUCT
export async function createProduct(product: {
  name: string;
  description: string;
  price: number;
  stock?: number;
  category?: string;
  image?: string;
}) {

  const token =
    localStorage.getItem("token");


  const response = await fetch(
    `${API_URL}/products`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify(product),
    }
  );


  const data =
    await response.json();


  if (!response.ok) {
    throw new Error(
      data.message || "Product creation failed"
    );
  }


  return data;
}