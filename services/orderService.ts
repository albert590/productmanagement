import { Order } from "@/types/order";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ecommerce-api-week4-1.onrender.com";


// GET ALL ORDERS

export async function getOrders(): Promise<Order[]> {

  const token =
    localStorage.getItem("token");


  const response =
    await fetch(
      `${API_URL}/orders`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.message || "Failed to get orders"
    );

  }


  return data;

}




// CREATE ORDER

export async function saveOrder(
  order: Partial<Order>
) {


  const token =
    localStorage.getItem("token");


  const response =
    await fetch(
      `${API_URL}/orders`,
      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,

        },


        body:
          JSON.stringify(order),

      }
    );



  const data =
    await response.json();



  if (!response.ok) {

    throw new Error(
      data.message || "Order creation failed"
    );

  }



  return data;

}





// UPDATE ORDER STATUS

export async function updateOrderStatus(
  id: string,
  status: Order["status"]
) {


  const token =
    localStorage.getItem("token");


  const response =
    await fetch(
      `${API_URL}/orders/${id}`,
      {

        method: "PATCH",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,

        },


        body:
          JSON.stringify({
            status,
          }),

      }
    );



  const data =
    await response.json();



  if (!response.ok) {

    throw new Error(
      data.message || "Update failed"
    );

  }



  return data;

}





// DELETE ORDER

export async function deleteOrder(
  id: string
) {


  const token =
    localStorage.getItem("token");


  const response =
    await fetch(
      `${API_URL}/orders/${id}`,
      {

        method: "DELETE",

        headers: {

          Authorization:
            `Bearer ${token}`,

        },

      }
    );



  if (!response.ok) {

    const data =
      await response.json();

    throw new Error(
      data.message || "Delete failed"
    );

  }


}