import type { Metadata } from "next";
import "./globals.css";

import Layout from "@/components/Layout";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Product Management System",
  description: "Product Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProductProvider>
          <CartProvider>
            <Layout>
              {children}
            </Layout>
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}