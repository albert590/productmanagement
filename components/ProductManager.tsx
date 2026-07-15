"use client";

import { useProducts } from "@/context/ProductContext";

export default function ProductManager() {

  const {
    products,
    deleteProduct,
  } = useProducts();


  return (
    <div>

      <h2>
        Manage Products
      </h2>


      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >

        <thead>
          <tr>

            <th>
              Product Name
            </th>

            <th>
              Price
            </th>

            <th>
              Category
            </th>

            <th>
              Action
            </th>

          </tr>
        </thead>


        <tbody>

          {products.map((product) => (

            <tr key={product.id}>

              <td>
                {product.title}
              </td>


              <td>
                ${product.price}
              </td>


              <td>
                {product.category}
              </td>


              <td>

                <button>
                  Edit
                </button>


                <button
                  onClick={() =>
                    deleteProduct(product.id)
                  }
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>


      </table>


    </div>
  );
}