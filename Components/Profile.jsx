import React from "react";
import Promptcard from "./Promptcard";
const Profile = ({ name, email, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
      {data.map((post) => (
        <Promptcard
          key={post._id}
          post={post}
          handleEdit={()=>{handleEdit && handleEdit(post)}}
          handleDelete={()=>{handleDelete && handleDelete(post)}}
        />
      ))}
    </div>
    </section>
  );
};

export default Profile;
