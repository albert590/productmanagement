"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { saveOrder } from "@/services/orderService";
import { useRouter } from "next/navigation";


export default function CheckoutPage() {

  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();


  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  function placeOrder() {

    if (!user) {
      alert("Please login first");
      router.push("/login");
      return;
    }


    const order = {

      id: crypto.randomUUID(),

      customerId: user.id,

      customerName: user.name,

      customerEmail: user.email,


      products: cart.map((item) => ({
        productId: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),


      totalAmount,


      status: "Pending" as const,


      createdAt:
        new Date().toISOString(),

    };


    saveOrder(order);


    clearCart();


    alert(
      "Order placed successfully!"
    );


    router.push("/");

  }



  return (

    <main className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>


      {cart.length === 0 ? (

        <p>
          Your cart is empty
        </p>

      ) : (

        <div className="bg-white p-6 rounded shadow">


          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>



          {cart.map((item)=>(

            <div
              key={item.id}
              className="flex justify-between border-b py-3"
            >

              <span>
                {item.title}
                {" "}x {item.quantity}
              </span>


              <span>
                $
                {item.price * item.quantity}
              </span>


            </div>

          ))}



          <div className="mt-5 text-xl font-bold">

            Total:
            {" "}
            ${totalAmount}

          </div>



          <button
            onClick={placeOrder}
            className="mt-6 w-full bg-teal-600 text-white py-3 rounded"
          >
            Place Order
          </button>


        </div>

      )}

    </main>

  );
}