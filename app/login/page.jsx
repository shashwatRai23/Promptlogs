"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { signIn ,useSession} from "next-auth/react";
import { useRouter } from "next/navigation";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res=await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if(res.error){
        setError("Invalid credentials");
        return;
      }
      router.replace("/");
    }
    catch(err){
      console.log(err);
    }
  };

  if(session){  // if user is already logged in
    router.replace("/");
  }

  return (
    <div className="form_container">
      <h1 className="text-xl font-bold my-4">Login</h1>
      <form className="flex flex-col gap-3">
        <input
          className="inp"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="inp"
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-yellow-600 text-white font-bold px-6 py-2 rounded-md border"
        >
          Sign In
        </button>
      </form>

      {error && (
        <div className="bg-black text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
          Error Message
        </div>
      )}

      <Link href="/register" className="text-sm mt-3 text-right">
        Don't have an account ? <span className="underline">Register</span>
      </Link>
    </div>
  );
};

export default login;
