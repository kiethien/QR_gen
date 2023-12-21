import NextAuth from "next-auth";
import { authOptions } from "@/util/auth"; // co the la loi

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};