import React, { useState } from "react";
import styles from "../css/blog.module.css";

const AddPostForm = ({ onAddPost }) => {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  const handleAddPost = () => {
    const newPost = {
      title: newPostTitle,
      content: newPostContent,
    };
    onAddPost(newPost);
    setNewPostTitle("");
    setNewPostContent("");
  };

  return (
    <div className={styles["add-post-form"]}>
      <input
        className={styles["form-input"]}
        type="text"
        placeholder="Title"
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        rows="1"
        cols="30"
      />
      <button className={styles["form-button"]} onClick={handleAddPost}>
        Add Post
      </button>
    </div>
  );
};

export default AddPostForm;
