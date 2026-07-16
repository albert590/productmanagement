"use client";

import { useProducts } from "@/context/ProductContext";


export default function AdminPage() {


  const { products } = useProducts();



  const categories = [
    ...new Set(
      products.map(
        (product)=>product.category
      )
    )
  ];



  const totalStock =
    products.reduce(
      (total, product)=>
        total + product.stock,
      0
    );



  return (

    <main>


      <h1 className="text-4xl font-bold text-slate-900 mb-8">
        Admin Dashboard
      </h1>



      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      ">



        <div className="
          bg-gradient-to-br
          from-teal-500
          to-cyan-500
          text-white
          p-6
          rounded-2xl
          shadow-lg
          hover:scale-105
          transition
        ">

          <p className="text-sm opacity-80">
            Total Products
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {products.length}
          </h2>

        </div>





        <div className="
          bg-gradient-to-br
          from-blue-500
          to-indigo-600
          text-white
          p-6
          rounded-2xl
          shadow-lg
          hover:scale-105
          transition
        ">

          <p className="text-sm opacity-80">
            Categories
          </p>


          <h2 className="text-4xl font-bold mt-3">
            {categories.length}
          </h2>


        </div>





        <div className="
          bg-gradient-to-br
          from-orange-500
          to-red-500
          text-white
          p-6
          rounded-2xl
          shadow-lg
          hover:scale-105
          transition
        ">


          <p className="text-sm opacity-80">
            Total Stock
          </p>


          <h2 className="text-4xl font-bold mt-3">
            {totalStock}
          </h2>


        </div>



      </div>




      <div className="
        mt-10
        bg-white
        rounded-2xl
        shadow
        p-6
      ">


        <h2 className="text-2xl font-bold mb-3">
          Welcome Admin 👋
        </h2>


        <p className="text-slate-600">
          Manage products, inventory, customers and orders from your dashboard.
        </p>


      </div>



    </main>

  );

}