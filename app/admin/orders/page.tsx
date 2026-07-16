"use client";

import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "@/services/orderService";
import { Order } from "@/types/order";


export default function AdminOrdersPage() {

  const [orders, setOrders] = useState<Order[]>([]);


  useEffect(() => {

    setOrders(getOrders());

  }, []);



  function changeStatus(
    id: string,
    status: Order["status"]
  ) {

    updateOrderStatus(id, status);

    setOrders(getOrders());

  }




  return (

    <main>

      <h1 className="text-3xl font-bold mb-6">
        Orders Management
      </h1>



      {orders.length === 0 ? (

        <p className="text-gray-600">
          No orders available.
        </p>

      ) : (


        <div className="space-y-6">


          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white p-6 rounded shadow"
            >


              <div className="flex justify-between mb-4">


                <div>

                  <h2 className="font-bold text-lg">
                    {order.customerName}
                  </h2>


                  <p className="text-sm text-gray-500">
                    {order.customerEmail}
                  </p>

                </div>



                <select
                  value={order.status}
                  onChange={(e)=>
                    changeStatus(
                      order.id,
                      e.target.value as Order["status"]
                    )
                  }
                  className="border p-2 rounded"
                >

                  <option>
                    Pending
                  </option>

                  <option>
                    Processing
                  </option>

                  <option>
                    Completed
                  </option>

                  <option>
                    Cancelled
                  </option>


                </select>


              </div>



              <div>

                <h3 className="font-semibold mb-2">
                  Products
                </h3>


                {order.products.map(
                  (product)=>(
                    
                    <p
                      key={product.productId}
                      className="text-sm"
                    >

                      {product.title}
                      {" "}x{product.quantity}

                      {" - $"}

                      {product.price}

                    </p>

                  )
                )}


              </div>




              <div className="mt-4 font-bold">

                Total:
                {" "}
                ${order.totalAmount}

              </div>



              <p className="text-sm text-gray-500 mt-2">

                Date:
                {" "}
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}

              </p>


            </div>


          ))}


        </div>


      )}


    </main>

  );

}