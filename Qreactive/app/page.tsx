import FunctionEX from "@/components/FunctionEX";
import Hero from "@/components/Hero";
import AuthProvider from "@/components/AuthProvider"


export default function Home() {
  return (
    <>
        <AuthProvider>
        <Hero />
        <FunctionEX />
      </AuthProvider>
    </>
  )
}
