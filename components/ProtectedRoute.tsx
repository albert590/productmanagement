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
    "/",
    "/products",
    "/login",
    "/register",
  ];



  const adminRoutes = [
    "/admin",
    "/admin/orders",
    "/admin/add-product",
  ];



  const isPublicRoute =
    publicRoutes.some((route) =>
      pathname === route ||
      pathname.startsWith(route + "/")
    );



  const isAdminRoute =
    adminRoutes.some((route) =>
      pathname.startsWith(route)
    );



  useEffect(() => {


    // Protect private pages
    if (
      !isAuthenticated &&
      !isPublicRoute
    ) {

      router.replace("/login");

      return;

    }



    // Protect admin pages
    if (
      isAuthenticated &&
      isAdminRoute &&
      user?.role !== "admin"
    ) {

      router.replace("/products");

      return;

    }



  }, [
    isAuthenticated,
    isPublicRoute,
    isAdminRoute,
    user,
    router,
  ]);





  if (
    !isAuthenticated &&
    !isPublicRoute
  ) {

    return (

      <div className="flex items-center justify-center min-h-screen">

        Checking authentication...

      </div>

    );

  }



  return children;

}