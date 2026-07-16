"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const {
    isAuthenticated,
    user,
  } = useAuth();


  const router = useRouter();

  const pathname = usePathname();



  const publicRoutes = [
    "/login",
    "/register",
  ];



  const adminRoutes = [
    "/admin",
    "/admin/orders",
    "/admin/add-product",
  ];



  useEffect(() => {


    if (
      !isAuthenticated &&
      !publicRoutes.includes(pathname)
    ) {

      router.push("/login");

    }



    if (
      isAuthenticated &&
      adminRoutes.some((route)=>
        pathname.startsWith(route)
      ) &&
      user?.role !== "admin"
    ) {

      router.push("/products");

    }


  }, [
    isAuthenticated,
    pathname,
    user,
    router,
  ]);





  if (
    !isAuthenticated &&
    !publicRoutes.includes(pathname)
  ) {

    return (
      <div className="flex items-center justify-center min-h-screen">
        Checking authentication...
      </div>
    );

  }




  return (
    <>
      {children}
    </>
  );

}