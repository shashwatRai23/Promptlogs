"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@Components/Profile";

const MyProfile = () => {
  const router=useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/updateprompt?id=${post._id}`)
  };
  const handleDelete = async(post) => {
    const hasConfirmed=confirm("Are you sure you want to delete this post?");
    if(hasConfirmed)
    {
      try{
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method:"DELETE"
        });
        const filteredPosts=posts.filter((p)=>p._id!==post._id);
        setPosts(filteredPosts);
      }catch(e){
        console.log(e);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.email}/posts`);
      const data = await res.json();
      // console.log(data);
      setPosts(data.prompts);
    };
    if(session?.user.email){fetchPosts();}
  }, []);

  return (
    <Profile
      name="My"
      email={session?.user.email}
      desc="Welcome to your personalised profile page. Here you can view your posts and edit your profile."
      data={[...posts]}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
