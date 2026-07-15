"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/types/product";
import { getProductById } from "@/services/productService";


export default function EditProductPage(){

  const { id } = useParams();

  const router = useRouter();

  const {
    products,
  updateProduct
  } = useProducts();


  const product = products.find((p) => p.id === Number(id));

  const [fetchedProduct, setFetchedProduct] = useState<Product | null>(null);

  const activeProduct = product || fetchedProduct;

  const [form, setForm] = useState({
    title: "",
    price: 0,
    category: "",
    thumbnail: "",
  });

  useEffect(() => {
    let mounted = true;
    if (!product && id) {
      getProductById(Number(id))
        .then((p) => {
          if (mounted) setFetchedProduct(p);
        })
        .catch(() => {
          /* ignore */
        });
    }

    return () => {
      mounted = false;
    };
  }, [id, product]);

  useEffect(() => {
    if (activeProduct) {
      setForm({
        title: activeProduct.title || "",
        price: activeProduct.price || 0,
        category: activeProduct.category || "",
        thumbnail: activeProduct.thumbnail || "",
      });
    }
  }, [activeProduct]);



  function change(e:any){

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  }



  async function submit(e:React.FormEvent){

    e.preventDefault();


    if (!activeProduct) return;

    await updateProduct(activeProduct.id, {
      title: form.title,
      price: Number(form.price),
      category: form.category,
      thumbnail: form.thumbnail,
      images: [form.thumbnail],
    });


    alert("Product Updated");

    router.push(
      "/admin/products"
    );

  }



  if (!activeProduct) {
    return <h2>Loading product...</h2>;
  }



  return (

    <main>

      <h1>
        Edit Product
      </h1>


      <form
        onSubmit={submit}
        style={{
          display:"grid",
          gap:"10px",
          width:"350px"
        }}
      >


        <input
          name="title"
          value={form.title}
          onChange={change}
        />


        <input
          name="price"
          type="number"
          value={form.price}
          onChange={change}
        />


        <input
          name="category"
          value={form.category}
          onChange={change}
        />


        <input
          name="thumbnail"
          placeholder="Image URL"
          value={form.thumbnail}
          onChange={change}
        />


        <button>
          Update Product
        </button>


      </form>


    </main>

  );

}