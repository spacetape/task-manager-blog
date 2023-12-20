import React, { useState, useEffect } from "react";
import BlogPost from "./BlogPost";
import AddPostForm from "./AddPostForm";
import SearchFilter from "./SearchFilter";
import api from "../services/api";
import styles from "../css/blog.module.css";
import Header from "./Header";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
      setFilteredPosts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleAddPost = async (newPost) => {
    try {
      const response = await api.post("/posts", newPost);
      setPosts([...posts, response.data]);
      setFilteredPosts([...filteredPosts, response.data]);
    } catch (error) {
      console.error("Error adding post:", error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
      setFilteredPosts(filteredPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  const handleEditPost = async (postId, updatedPost) => {
    try {
      await api.put(`/posts/${postId}`, updatedPost);
      setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
      setFilteredPosts(
        filteredPosts.map((post) => (post.id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error("Error editing post:", error.message);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <>
      <Header></Header>
      <div className={styles.blogContainer}>
        <h1 className={styles.blogTitle}>My Blog</h1>
        <div className={styles.searchAddContainer}>
          <SearchFilter onSearch={handleSearch} />
          <AddPostForm onAddPost={handleAddPost} />
        </div>
        <div className={styles.blogPosts}>
          {filteredPosts.map((post) => (
            <div key={post.id} className={styles.blogPost}>
              <BlogPost
                post={post}
                onDelete={handleDeletePost}
                onEdit={handleEditPost}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
