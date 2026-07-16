"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function RegisterPage() {

  const router = useRouter();

  const { register } = useAuth();


  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] =
    useState<"admin" | "customer">("customer");




  function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();


    const success = register({

      id: crypto.randomUUID(),

      name,

      username,

      email,

      password,

      role,

      createdAt:
        new Date().toISOString(),

    });



    if (success) {

      alert(
        "Registration successful. Please login."
      );

      router.push("/login");


    } else {

      alert(
        "Email or username already exists."
      );

    }

  }





  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">


      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >


        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>



        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>
            setName(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
          required
        />



        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>
            setUsername(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
          required
        />



        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
          required
        />



        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
          required
        />



        <select
          value={role}
          onChange={(e)=>
            setRole(
              e.target.value as
              "admin" | "customer"
            )
          }
          className="w-full border p-3 mb-6 rounded"
        >

          <option value="customer">
            Customer
          </option>


          <option value="admin">
            Admin
          </option>


        </select>



        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Register
        </button>



        <p className="text-center mt-4">

          Already have an account?

          <button
            type="button"
            onClick={()=>
              router.push("/login")
            }
            className="text-blue-600 ml-2"
          >
            Login
          </button>

        </p>


      </form>


    </div>

  );

}