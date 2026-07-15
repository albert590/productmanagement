"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/ProductContext";

export default function AdminProductsPage() {
  const router = useRouter();

  const {
    products,
    deleteProduct,
    loading,
  } = useProducts();

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  async function deleteItem(id: number) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;


    try {

      await deleteProduct(id);

      setMessage(
        "Product deleted successfully"
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);


    } catch (error) {

      console.error(
        "Delete error:",
        error
      );

    }

  }



  return (
    <main className="p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Products Management
          </h1>

          <p className="text-gray-500">
            Total Products: {products.length}
          </p>
        </div>


        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
          />


          <button
            onClick={() =>
              router.push("/admin/add-product")
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Product
          </button>

        </div>

      </div>



      {message && (
        <p className="text-green-600 mb-4">
          {message}
        </p>
      )}



      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Stock
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>


            {loading ? (

              <tr>
                <td
                  colSpan={6}
                  className="text-center p-10"
                >
                  Loading products...
                </td>
              </tr>


            ) : filteredProducts.length === 0 ? (

              <tr>
                <td
                  colSpan={6}
                  className="text-center p-10"
                >
                  No products found.
                </td>
              </tr>


            ) : (

              filteredProducts.map((product) => (

                <tr
                  key={product.id}
                  className="border-t"
                >

                  <td className="p-4">

                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-14 h-14 object-cover rounded"
                    />

                  </td>


                  <td className="p-4 font-semibold">

                    {product.title}

                  </td>


                  <td className="p-4">

                    {product.category}

                  </td>


                  <td className="p-4">

                    ${product.price}

                  </td>


                  <td className="p-4">

                    {product.stock}

                  </td>


                  <td className="p-4 space-x-3">


                    <button
                      onClick={() =>
                        router.push(
                          `/admin/products/edit/${product.id}`
                        )
                      }
                      className="text-blue-600"
                    >
                      Edit
                    </button>



                    <button
                      onClick={() =>
                        deleteItem(product.id)
                      }
                      className="text-red-600"
                    >
                      Delete
                    </button>


                  </td>


                </tr>

              ))

            )}


          </tbody>

        </table>

      </div>


    </main>
  );
}