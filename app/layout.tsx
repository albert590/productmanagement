import type { Metadata } from "next";

import "./globals.css";

import Layout from "@/components/Layout";

import { AuthProvider } from "@/context/AuthContext";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";



export const metadata: Metadata = {

  title: "Product Management System",

  description: "E-Commerce Product Management System",

};




export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {


  return (

    <html lang="en">

      <body>

        <AuthProvider>

          <ProductProvider>

            <CartProvider>

              <Layout>

                {children}

              </Layout>

            </CartProvider>

          </ProductProvider>

        </AuthProvider>


      </body>

    </html>

  );

}