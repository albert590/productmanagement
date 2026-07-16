"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function Header() {

  const router = useRouter();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();



  function handleLogout() {

    logout();

    router.push("/login");

  }



  return (

    <header className="bg-white shadow-md border-b">


      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-6">



        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >

          <div
            className="
              h-12
              w-12
              rounded-xl
              bg-gradient-to-br
              from-teal-500
              to-cyan-500
              flex
              items-center
              justify-center
              text-white
              font-bold
              text-xl
              shadow-lg
            "
          >
            PM
          </div>



          <div>

            <h1 className="text-lg font-bold text-slate-900">
              Product Management
            </h1>


            <p className="text-xs text-slate-500">
              Smart E-Commerce System
            </p>


          </div>


        </Link>





        {/* Search */}

        <div className="flex-1 max-w-xl">


          <input

            type="text"

            placeholder="Search products..."

            className="
              w-full
              border
              border-slate-200
              rounded-full
              px-5
              py-2
              outline-none
              focus:ring-2
              focus:ring-cyan-400
            "

          />


        </div>





        {/* Navigation */}


        <nav className="flex items-center gap-4">


          <Link
            href="/products"
            className="
              text-slate-700
              hover:text-teal-600
              font-medium
            "
          >
            Products
          </Link>




          <Link
            href="/cart"
            className="
              text-slate-700
              hover:text-teal-600
              font-medium
            "
          >
            Cart
          </Link>





          <Link
            href="/admin"
            className="
              text-slate-700
              hover:text-teal-600
              font-medium
            "
          >
            Admin
          </Link>





          {
            !isAuthenticated ? (

              <>

                <Link
                  href="/login"
                  className="
                    text-teal-600
                    font-semibold
                  "
                >
                  Login
                </Link>




                <Link
                  href="/register"
                  className="
                    bg-gradient-to-r
                    from-teal-500
                    to-cyan-500
                    text-white
                    px-5
                    py-2
                    rounded-full
                    shadow
                    hover:scale-105
                    transition
                  "
                >
                  Register
                </Link>


              </>


            ) : (


              <>


                <span
                  className="
                    text-sm
                    text-slate-700
                    hidden
                    lg:block
                  "
                >

                  Hi, {user?.name}

                </span>




                <button

                  onClick={handleLogout}

                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-full
                  "

                >

                  Logout

                </button>



              </>


            )
          }



        </nav>



      </div>


    </header>

  );

}