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
        "Account created successfully"
      );

      router.push("/login");


    } else {

      alert(
        "Email or username already exists"
      );

    }

  }





  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-slate-50
        via-white
        to-cyan-100
      "
    >


      <form

        onSubmit={handleSubmit}

        className="
          bg-white
          w-full
          max-w-md
          p-8
          rounded-2xl
          shadow-xl
        "

      >



        <div className="text-center mb-8">


          <div
            className="
              mx-auto
              h-14
              w-14
              rounded-xl
              bg-gradient-to-br
              from-teal-500
              to-cyan-500
              flex
              items-center
              justify-center
              text-white
              text-2xl
              font-bold
            "
          >
            PM
          </div>



          <h1
            className="
              text-3xl
              font-bold
              mt-4
              text-slate-900
            "
          >
            Create Account
          </h1>



          <p className="text-slate-500 mt-2">
            Join our shopping platform
          </p>


        </div>





        <input

          type="text"

          placeholder="Full Name"

          value={name}

          onChange={(e)=>
            setName(e.target.value)
          }

          className="
            w-full
            border
            rounded-lg
            p-3
            mb-4
            outline-none
            focus:ring-2
            focus:ring-cyan-400
          "

          required

        />





        <input

          type="text"

          placeholder="Username"

          value={username}

          onChange={(e)=>
            setUsername(e.target.value)
          }

          className="
            w-full
            border
            rounded-lg
            p-3
            mb-4
            outline-none
            focus:ring-2
            focus:ring-cyan-400
          "

          required

        />





        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e)=>
            setEmail(e.target.value)
          }

          className="
            w-full
            border
            rounded-lg
            p-3
            mb-4
            outline-none
            focus:ring-2
            focus:ring-cyan-400
          "

          required

        />





        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e)=>
            setPassword(e.target.value)
          }

          className="
            w-full
            border
            rounded-lg
            p-3
            mb-4
            outline-none
            focus:ring-2
            focus:ring-cyan-400
          "

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

          className="
            w-full
            border
            rounded-lg
            p-3
            mb-6
          "

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

          className="
            w-full
            bg-gradient-to-r
            from-teal-500
            to-cyan-500
            text-white
            py-3
            rounded-lg
            font-semibold
            hover:scale-105
            transition
          "

        >

          Register

        </button>





        <p
          className="
            text-center
            mt-6
            text-slate-600
          "
        >

          Already have an account?


          <button

            type="button"

            onClick={() =>
              router.push("/login")
            }

            className="
              text-teal-600
              font-semibold
              ml-2
            "

          >

            Login

          </button>


        </p>




      </form>


    </div>

  );

}