import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    email: string;
    token: string;
    id: string;
    user: {
      email: string;
      token: string;
      id: string;
    };
  }
}
