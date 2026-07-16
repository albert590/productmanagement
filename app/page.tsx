"use client";

import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";


export default function HomePage() {

  const { products, loading } = useProducts();



  const featuredProducts =
    products.slice(0, 8);



  return (

    <main>


      {/* Hero Section */}

      <section
        className="
          rounded-3xl
          bg-gradient-to-r
          from-teal-500
          to-cyan-500
          text-white
          p-10
          md:p-16
          shadow-xl
          mb-12
        "
      >


        <div className="max-w-3xl">


          <h1
            className="
              text-4xl
              md:text-6xl
              font-bold
              leading-tight
            "
          >
            Shop Smarter With Our Product Management System
          </h1>



          <p
            className="
              mt-5
              text-lg
              text-cyan-50
            "
          >
            Discover quality products, manage your inventory,
            and enjoy a simple online shopping experience.
          </p>




          <div className="flex gap-4 mt-8">


            <Link
              href="/products"
              className="
                bg-white
                text-teal-600
                px-6
                py-3
                rounded-full
                font-semibold
                hover:scale-105
                transition
              "
            >
              Browse Products
            </Link>




            <Link
              href="/register"
              className="
                border
                border-white
                px-6
                py-3
                rounded-full
                font-semibold
                hover:bg-white
                hover:text-teal-600
                transition
              "
            >
              Create Account
            </Link>


          </div>


        </div>


      </section>





      {/* Featured Products */}


      <section>


        <div className="
          flex
          justify-between
          items-center
          mb-6
        ">


          <h2
            className="
              text-3xl
              font-bold
              text-slate-900
            "
          >
            Featured Products
          </h2>



          <Link
            href="/products"
            className="
              text-teal-600
              font-semibold
            "
          >
            View All →
          </Link>


        </div>





        {
          loading ? (

            <div
              className="
                text-center
                py-10
              "
            >

              Loading products...

            </div>


          ) : (


            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-6
              "
            >

              {
                featuredProducts.map(
                  (product)=>(
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  )
                )
              }


            </div>


          )
        }



      </section>



    </main>

  );

}