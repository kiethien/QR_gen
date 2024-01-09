"use client";
import AuthProvider from "@/components/AuthProvider"
import Navbar from "@/components/Navbar";
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
      <>
        <html lang="en">
        <body className="pt-6">
            <Navbar/>
            <main className="container flex">
            {children}
            </main>
        </body>
        </html>
      </>
    )
  }