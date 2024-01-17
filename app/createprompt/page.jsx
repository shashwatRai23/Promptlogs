"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@Components/Form";

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.replace("/login");
  }
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createnewprompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userEmail: session?.user.email,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createnewprompt}
    />
  );
};

export default CreatePrompt;
