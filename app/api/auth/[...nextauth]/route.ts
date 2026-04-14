
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "you@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         // DB se user fetch karo
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) return null;

//         // Password ko bcrypt se verify karo
//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) return null;

//         // Agar sab theek hai to user return karo
//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//         };
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async session({ session, token }) {
//       if (session.user) {
//         (session.user as any).id = token.sub;
//       }
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login", // ye tumhare login page ko point kare
//   },

//   secret: process.env.NEXTAUTH_SECRET,
//   debug: true, // development mai errors dekhne ke liye
// });

// export { handler as GET, handler as POST };
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };