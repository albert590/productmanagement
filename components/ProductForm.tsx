"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";


export default function ProductForm() {

  const { createProduct } = useProducts();


  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");



  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();


    if (!title || !price || !category) {
      alert("Fill all required fields");
      return;
    }


    await createProduct({

      title,

      price: Number(price),

      category,

      description,

      thumbnail: "",

      images: [],

      brand: "",

      stock: 0,

      rating: 0,

      discountPercentage: 0,

    });


    setTitle("");
    setPrice("");
    setCategory("");
    setDescription("");

    alert("Product Added Successfully");

  }



  return (

    <form
      onSubmit={handleSubmit}
      style={{
        display:"flex",
        flexDirection:"column",
        gap:"10px",
        maxWidth:"400px",
      }}
    >

      <h2>
        Add New Product
      </h2>


      <input
        placeholder="Product Name"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />


      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />


      <input
        placeholder="Category"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
      />


      <textarea
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />


      <button type="submit">
        Add Product
      </button>


    </form>

  );

}