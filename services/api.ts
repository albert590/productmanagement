const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ecommerce-api-week4-1.onrender.com";


// GET PRODUCTS
export async function getProducts() {

  const response = await fetch(
    `${API_URL}/products`,
    {
      cache: "no-store",
    }
  );


  const data = await response.json();


  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load products"
    );
  }


  return data;

}



// CREATE PRODUCT
export async function createProduct(product:any) {


  const token =
    localStorage.getItem("token");


  const response = await fetch(
    `${API_URL}/products`,
    {

      method:"POST",

      headers:{
        "Content-Type":"application/json",

        Authorization:
          `Bearer ${token}`,
      },


      body:JSON.stringify(product),

    }
  );


  const data =
    await response.json();


  if(!response.ok){

    throw new Error(
      data.message || "Create failed"
    );

  }


  return data;

}



// UPDATE PRODUCT
export async function updateProduct(
id:string,
product:any
){

const token =
localStorage.getItem("token");


const response =
await fetch(
`${API_URL}/products/${id}`,
{
method:"PUT",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`,
},

body:JSON.stringify(product),

}
);


return response.json();

}




// DELETE PRODUCT
export async function deleteProduct(
id:string
){

const token =
localStorage.getItem("token");


const response =
await fetch(
`${API_URL}/products/${id}`,
{

method:"DELETE",

headers:{
Authorization:`Bearer ${token}`,
},

}
);


return response.json();

}