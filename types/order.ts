export interface OrderItem {
  productId: number;
  title: string;
  quantity: number;
  price: number;
}


export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;

  products: OrderItem[];

  totalAmount: number;

  status:
    | "Pending"
    | "Processing"
    | "Completed"
    | "Cancelled";

  createdAt: string;
}