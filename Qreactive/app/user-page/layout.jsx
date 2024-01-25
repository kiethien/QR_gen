"use client";

export default function Layout({ children }) {
    return (
      <>
        <html lang="en">
        <body className=" ">
            <main className=" container flex ">
            {children}
          </main>
        </body>
        </html>
      </>
    )
  }
  