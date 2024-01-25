import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email"; // Add the email provider
import CredentialsProvider from "next-auth/providers/credentials"; // Add the credentials provider
import prisma from "./connect";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
          username: {
              label: "Username:",
              type: "text",
              placeholder: "your-cool-username"
          },
          password: {
              label: "Password:",
              type: "password",
              placeholder: "your-awesome-password"
          }
      },
      async authorize(credentials) {
        try {
            // Modify this logic to fetch user information from MongoDB based on the credentials supplied
  
            // Example: Fetch user from MongoDB
            const user = await prisma.user.findUnique({
              where: { name: credentials.username },
            });
  
            // Check if the user exists and the password is correct
            if (user && credentials.password === user.password) {
              return { ...user, id: user.id.toString() }; // Include user ID
            } else {
              return null;
            }
          } catch (error) {
            // Handle errors, log them, etc.
            console.error("Error fetching user from MongoDB:", error);
            return null;
          }
        },
      }),
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
  ],
};