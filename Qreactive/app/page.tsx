import FunctionEX from "@/components/FunctionEX";
import Hero from "@/components/Hero";
import AuthProvider from "@/components/AuthProvider"
import Selection from "@/components/Selection";
import Instruction from "@/components/Instruction";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <>
        <AuthProvider>
        <Hero />
        <Selection />
        <Instruction />
        <Faq />
        <FunctionEX />
      </AuthProvider>
    </>
  )
}
