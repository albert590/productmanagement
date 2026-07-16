"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { getOrders } from "@/services/orderService";
import { Order } from "@/types/order";


export default function AdminStats() {

  const { products, loading } = useProducts();

  const [orders, setOrders] = useState<Order[]>([]);



  useEffect(() => {

    const allOrders = getOrders();

    setOrders(allOrders);

  }, []);




  const customers = [
    ...new Set(
      orders.map(
        (order) => order.customerId
      )
    ),
  ];



  const totalRevenue =
    orders.reduce(
      (total, order) =>
        total + order.totalAmount,
      0
    );




  if (loading) {

    return (

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">

        {[1,2,3,4].map((item)=>(

          <div
            key={item}
            className="bg-white rounded shadow h-24 animate-pulse"
          />

        ))}

      </div>

    );

  }




  return (

    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">


      <div className="bg-white p-4 rounded shadow">

        <p className="text-sm text-slate-500">
          Products
        </p>

        <h2 className="text-2xl font-bold">
          {products.length}
        </h2>

      </div>




      <div className="bg-white p-4 rounded shadow">

        <p className="text-sm text-slate-500">
          Orders
        </p>

        <h2 className="text-2xl font-bold">
          {orders.length}
        </h2>

      </div>




      <div className="bg-white p-4 rounded shadow">

        <p className="text-sm text-slate-500">
          Customers
        </p>

        <h2 className="text-2xl font-bold">
          {customers.length}
        </h2>

      </div>




      <div className="bg-white p-4 rounded shadow">

        <p className="text-sm text-slate-500">
          Revenue
        </p>

        <h2 className="text-2xl font-bold">
          ${totalRevenue}
        </h2>

      </div>



    </div>

  );

}