"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  // const [providers, setProviders] = useState(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className="flex-between w-full mb-16 p-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="./assets/images/logo.svg"
          alt="promptlog-logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptlogs</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/createprompt" className="black_btn">
              Create Post
            </Link>

            <button
              className="outline_btn"
              type="button"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            {/* <div>{session?.user?.email}</div> */}
            <Link href="/profile">
              <div className="font-bold bg-red-600 text-center text-white rounded-full w-10 h-10  px-2 py-2">
                {session.user.email.charAt(0).toUpperCase()}
              </div>
            </Link>
          </div>
        ) : (
          <>
            <Link href="/login" className="black_btn">
              Sign In
            </Link>
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <div
              className="font-bold bg-red-600 text-center text-white cursor-pointer  rounded-full w-10 h-10  px-2 py-2"
              onClick={() => setToggleDropdown((prev) => !prev)}
            >
              {`${session?.user.email
                .charAt(0)
                .toUpperCase()}${session?.user.email.charAt(1).toUpperCase()}`}
            </div>
            {toggleDropdown && (
              <div className="dropdown absolute right-0 top-10 bg-white rounded-lg shadow-lg p-2 ">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setToggleDropdown(false);
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/login" className="black_btn">
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
