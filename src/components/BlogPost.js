import React, { useState } from "react";
import styles from "../css/blog.module.css";

const BlogPost = ({ post, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(post.id, { title: editedTitle, content: editedContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  return (
    <div className={styles.postContainer}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className={styles.postActions}>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => onDelete(post.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
