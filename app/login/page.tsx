"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function LoginPage() {

  const router = useRouter();

  const { login } = useAuth();



  const [emailOrUsername, setEmailOrUsername] =
    useState("");

  const [password, setPassword] =
    useState("");



  const [error, setError] =
    useState("");





  function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();



    const success =
      login(
        emailOrUsername,
        password
      );



    if (success) {


      alert(
        "Login successful"
      );


      router.push("/");


    } else {


      setError(
        "Invalid username/email or password"
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
          Login
        </h1>



        {error && (

          <p className="text-red-500 text-center mb-4">
            {error}
          </p>

        )}





        <input
          type="text"
          placeholder="Email or Username"
          value={emailOrUsername}
          onChange={(e)=>
            setEmailOrUsername(
              e.target.value
            )
          }
          className="w-full border p-3 mb-4 rounded"
          required
        />





        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
          className="w-full border p-3 mb-6 rounded"
          required
        />





        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Login
        </button>




        <p className="text-center mt-4">

          Don't have an account?

          <button
            type="button"
            onClick={()=>
              router.push("/register")
            }
            className="text-blue-600 ml-2"
          >
            Register
          </button>


        </p>



      </form>


    </div>

  );

}