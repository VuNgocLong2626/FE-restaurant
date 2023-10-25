"use client";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const SignInButton = () => {
  const { data: session } = useSession();
  // console.log(session?.user);

  if (session && session.user)
    return (
      <div className="flex gap-4 ml-auto">
        <h1>Ahihih</h1>
        <h1>{session?.user.email}</h1>
        <Link
          href={"/api/auth/signout"}
          className="flex gap-4 ml-auto text-red-600"
        >
          Sign Out
        </Link>
      </div>
    );

  return (
    <div className="flex gap-4 ml-auto items-center">
      <button className="text-green-600" onClick={() => signIn()}>
        Sign In aNKMNKLJNLJLKJ
      </button>
    </div>
  );
};

export default SignInButton;
