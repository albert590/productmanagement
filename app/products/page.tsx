"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/ProductContext";

export default function ProductsPage() {
  const router = useRouter();
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <main className="py-16 text-center">
        <p className="text-lg text-slate-600">Loading products...</p>
      </main>
    );
  }

  if (!products.length) {
    return (
      <main className="py-16 text-center">
        <p className="text-lg text-slate-600">No products are available at the moment.</p>
      </main>
    );
  }

  return (

    <main>

      <h1>
        Products
      </h1>


      <div
        style={{
          display:"grid",
          gridTemplateColumns:
          "repeat(4,1fr)",
          gap:"20px",
          marginTop:"30px"
        }}
      >


        {products.map((product)=>(


          <div

            key={product.id}

            style={{

              border:"1px solid #ddd",

              borderRadius:"10px",

              padding:"15px"

            }}

          >


            {product.thumbnail && (

              <Image

                src={product.thumbnail}

                alt={product.title}

                width={200}

                height={200}

                style={{
                  objectFit:"cover"
                }}

              />

            )}



            <h3>

              {product.title}

            </h3>



            <p>

              {product.category}

            </p>



            <h3>

              ${product.price}

            </h3>



            <button

              onClick={()=>


                router.push(
                  `/products/${product.id}`
                )


              }

            >

              View Details

            </button>



          </div>


        ))}


      </div>


    </main>

  );

}