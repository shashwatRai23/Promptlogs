"use client";

import Link from "next/link";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const router=useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Please fill all the fields");
      return;
    }
    // console.log({ username, email, password });
    try{

      // ******************Checking if the user is already registered*******************
      const resUserExists=await fetch("/api/userexists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email}),
      });
      // console.log("resUserExists : ",resUserExists);
      if(resUserExists.ok){ // if user exists 
        console.log("User does not exists");
      }
      else{
        setError("User already exists");
        return;
      }
      // if(user){
      //   setError("User already exists");
      //   return;
      // }


      // *********************Registering the user*************************************
      const res=await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if(res.ok){
        setUsername("");
        setEmail("");
        setPassword("");
        setError("");
        console.log("User registered successfully");
        router.push("/login");
        // e.target.reset();
      }
      else{
        console.log("User registeration failed");
      }

    }
    catch(err){
      console.log("Error during registeration : ",err);
    }
  };

  if(session){
    redirect("/");
  }

  return (
    <div className="form_container">
      <h1 className="text-xl font-bold my-4">Register</h1>
      <form className="flex flex-col gap-3">
        <input
          className="inp"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="inp"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="inp"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-yellow-600 text-white font-bold px-6 py-2 rounded-md border"
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>
      {error && (
        <div className="bg-black text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
          {error}
        </div>
      )}

      <Link href="/login" className="text-sm mt-3 text-right">
        Already have an account ? <span className="underline">Login</span>
      </Link>
    </div>
  );
};

export default register;
