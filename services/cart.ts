const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ecommerce-api-week4-1.onrender.com";


// GET CART
export async function getCart(
  userId: string
) {

  const response = await fetch(
    `${API_URL}/cart/${userId}`
  );


  const text = await response.text();


  if (!text) {
    return {
      items: []
    };
  }


  const data = JSON.parse(text);


  if (!response.ok) {
    throw new Error(
      data.message || "Failed to get cart"
    );
  }


  return data;

}





// ADD TO CART
export async function addToCart(
  userId: string,
  productId: string,
  quantity: number
) {


  const response = await fetch(
    `${API_URL}/cart/${userId}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        productId,
        quantity,
      }),
    }
  );


  const text = await response.text();


  if (!text) {
    return null;
  }


  const data = JSON.parse(text);


  if (!response.ok) {
    throw new Error(
      data.message || "Failed to add cart"
    );
  }


  return data;

}





// REMOVE ITEM
export async function removeFromCart(
  userId: string,
  productId: string
) {


  const response = await fetch(
    `${API_URL}/cart/${userId}/${productId}`,
    {
      method: "DELETE",
    }
  );


  const text = await response.text();


  if (!text) {
    return null;
  }


  return JSON.parse(text);

}





// CLEAR CART
export async function clearCart(
  userId: string
) {


  const response = await fetch(
    `${API_URL}/cart/${userId}`,
    {
      method: "DELETE",
    }
  );


  const text = await response.text();


  if (!text) {
    return null;
  }


  return JSON.parse(text);

}