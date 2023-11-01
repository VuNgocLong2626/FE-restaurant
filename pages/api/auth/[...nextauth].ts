import axiosInstance from "@/config/axiosInstance";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    secret:
      process.env.AUTH_SECRET || "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const user = await axiosInstance
            .post("/auth/login", {
              email: credentials?.email,
              password: credentials?.password,
            })
            .then((res) => {
              return res.data;
            })
            .catch((err) => {
              return err.response.data;
            });
          console.log("-----------user-----", user);

          res.setHeader(
            "Set-Cookie",
            `access-token=${user.token}; Path=/; Secure; HttpOnly;`
          );
          if (user.email) {
            // localStorage.setItem("id", user.id);
            return user;
          } else {
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        token.userRole = "admin";
        // console.log(token);
        return { ...token, ...user };
      },
      async session({ session, token, user }) {
        session.user = token as any;
        return session;
      },
    },
    events: {
      async signOut({ token, session }) {
        res.setHeader("Set-Cookie", "access-token=; path=/; max-age=0");
        token = {};
      },
    },

    pages: {
      signIn: "/login",
      error: "/login",
    },
  });
}
