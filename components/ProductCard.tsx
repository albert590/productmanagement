"use client";

import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";


export default function ProductCard({
  product,
}: {
  product: Product;
}) {


  const { addToCart } = useCart();



  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        overflow-hidden
        hover:shadow-xl
        hover:-translate-y-1
        transition
        duration-300
      "
    >



      {/* Product Image */}

      <div
        className="
          relative
          h-56
          bg-slate-100
        "
      >

        <Image

          src={product.thumbnail}

          alt={product.title}

          fill

          className="
            object-cover
          "

        />

      </div>




      {/* Product Details */}

      <div className="p-5">


        <h2
          className="
            text-lg
            font-bold
            text-slate-900
            truncate
          "
        >

          {product.title}

        </h2>




        <p
          className="
            text-sm
            text-slate-500
            mt-2
            line-clamp-2
          "
        >

          {product.description}

        </p>





        <div className="
          flex
          justify-between
          items-center
          mt-4
        ">


          <span
            className="
              text-xl
              font-bold
              text-teal-600
            "
          >

            ${product.price}

          </span>



          <span
            className="
              text-sm
              bg-green-100
              text-green-700
              px-3
              py-1
              rounded-full
            "
          >

            Stock: {product.stock}

          </span>


        </div>





        <div className="
          flex
          gap-3
          mt-5
        ">



          <Link

            href={`/products/${product.id}`}

            className="
              flex-1
              text-center
              border
              border-teal-500
              text-teal-600
              py-2
              rounded-lg
              hover:bg-teal-50
            "

          >

            View

          </Link>





          <button

            onClick={() =>
              addToCart(product)
            }

            className="
              flex-1
              bg-gradient-to-r
              from-teal-500
              to-cyan-500
              text-white
              py-2
              rounded-lg
              hover:opacity-90
            "

          >

            Add Cart

          </button>



        </div>



      </div>



    </div>

  );

}
