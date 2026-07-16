import { Order } from "@/types/order";

const ORDERS_KEY = "orders";


export function saveOrder(order: Order) {
  if (typeof window === "undefined") {
    return;
  }


  const orders: Order[] = JSON.parse(
    localStorage.getItem(ORDERS_KEY) || "[]"
  );


  orders.push(order);


  localStorage.setItem(
    ORDERS_KEY,
    JSON.stringify(orders)
  );
}



export function getOrders(): Order[] {

  if (typeof window === "undefined") {
    return [];
  }


  const orders: Order[] = JSON.parse(
    localStorage.getItem(ORDERS_KEY) || "[]"
  );


  return orders;
}



export function updateOrderStatus(
  id: string,
  status: Order["status"]
) {

  if (typeof window === "undefined") {
    return;
  }


  const orders = getOrders();


  const updatedOrders = orders.map(
    (order) =>
      order.id === id
        ? {
            ...order,
            status,
          }
        : order
  );


  localStorage.setItem(
    ORDERS_KEY,
    JSON.stringify(updatedOrders)
  );
}



export function deleteOrder(id: string) {

  if (typeof window === "undefined") {
    return;
  }


  const orders = getOrders();


  const filteredOrders =
    orders.filter(
      (order) => order.id !== id
    );


  localStorage.setItem(
    ORDERS_KEY,
    JSON.stringify(filteredOrders)
  );
}