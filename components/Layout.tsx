"use client";

import type { ReactNode } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";


export default function Layout({
  children,
}: {
  children: ReactNode;
}) {

  return (

    <ProtectedRoute>

      <div className="min-h-screen bg-gray-50 text-gray-900">

        <Header />


        <main className="container mx-auto px-4 py-8">

          {children}

        </main>


        <Footer />

      </div>

    </ProtectedRoute>

  );

}