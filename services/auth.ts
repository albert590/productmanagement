import { User } from "@/types/user";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ecommerce-api-week4-1.onrender.com";


// REGISTER
export async function registerUser(user: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {

  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );


  const data = await response.json();


  if (!response.ok) {
    throw new Error(
      data.message || "Registration failed"
    );
  }


  return data.user;
}


// LOGIN
export async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<{
  access_token: string;
}> {

  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );


  const data = await response.json();


  if (!response.ok) {
    throw new Error(
      data.message || "Login failed"
    );
  }


  if (typeof window !== "undefined") {

    localStorage.setItem(
      "token",
      data.access_token
    );

  }


  return data;
}