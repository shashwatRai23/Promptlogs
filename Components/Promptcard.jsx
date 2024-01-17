"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Promptcard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex gap-2 items-center">
          <div className="font-bold bg-red-600 text-center text-white rounded-full w-10 h-10  px-2 py-2">
            {`${post.creator.charAt(0).toUpperCase()}${post.creator.charAt(1).toUpperCase()}`}
          </div>
          <h3 className="font-satoshi font-semibold text-gray-900">
            {post.creator}
          </h3>
          <div></div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        onClick={handleTagClick && handleTagClick(post.tag)}
        className="font-inter text-sm blue_gradient cursor-pointer"
      >
        {post.tag}
      </p>
      {pathname === "/profile" && session?.user.email === post.creator && (
        <div className="flex justify-between items-center mt-5">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default Promptcard;
