"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/ProductContext";


export default function ProductForm() {

  const { createProduct } = useProducts();
  const router = useRouter();


  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");



  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createProduct({
        title,
        price: Number(price),
        category,
        thumbnail,
        images: [thumbnail],
        description: "New product added",
        brand: "",
        stock: 0,
        rating: 0,
        discountPercentage: 0,
      });

      setTitle("");
      setPrice("");
      setCategory("");
      setThumbnail("");

      alert("Product added successfully");
      router.push('/admin/products');
    } catch (err) {
      console.error(err);
      alert('Failed to create product.');
    }
  }



  return (

    <form
      onSubmit={handleSubmit}
      style={{
        display:"flex",
        flexDirection:"column",
        gap:"15px",
        width:"400px"
      }}
    >

      <h2>
        Add Product
      </h2>


      <input
        placeholder="Product Name"
        value={title}
        onChange={(e)=>
          setTitle(e.target.value)
        }
      />


      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e)=>
          setPrice(e.target.value)
        }
      />


      <input
        placeholder="Category"
        value={category}
        onChange={(e)=>
          setCategory(e.target.value)
        }
      />


      <input
        placeholder="Image URL"
        value={thumbnail}
        onChange={(e)=>
          setThumbnail(e.target.value)
        }
      />



      <button type="submit">
        Add Product
      </button>


    </form>

  );

}
