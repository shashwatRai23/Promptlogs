"use client";

import { useEffect, useState } from "react";
import Promptcard from "./Promptcard";
import { useSession } from "next-auth/react";
import myanimation from "@public/assets/images/animation2.json";
import lottie from "lottie-web";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <Promptcard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const { data: session } = useSession();
  // console.log(myanimation)

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data.prompts);
    };
    session?.user && fetchPosts();
    return () => {
      lottie.loadAnimation({
        container: document.querySelector("#animation"),
        animationData: myanimation,
        renderer: "svg",
        loop: true,
        autoplay: true,
      });
    };

  }, []);

  const [searchText, setSearchText] = useState("");

  return (
    <>
      {session && (
        <section className="feed">
          <form className="relative w-full flex-center">
            <input
              type="text"
              placeholder="search for a tag or a username"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              required
              className="search_input peer"
            />
          </form>
          <PromptCardList data={[...posts]} handleTagClick={() => {}} />
        </section>
      )}
      {!session && (
        <div className="flex-center mt-2 flex-col">
          {/* <h1 className="">Please sign in to view the feed</h1> */}
          <div id="animation" className="h-64 w-64"></div>
        </div>
      )}
    </>
  );
};

export default Feed;
