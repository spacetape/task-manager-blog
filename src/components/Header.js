import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

const Header = ({ onTaskAdd }) => {
  const openTaskInput = () => {
    const task = prompt("Enter your task:");
    if (task) {
      onTaskAdd(task);

      if (window.updateTaskCounterBig) {
        window.updateTaskCounterBig();
      }
    }
  };

  return (
    <header>
      <div className="avatar-container">
        <Link to="/profile">
          <img src={require("../assets/a.jpg")} alt="Avatar" />
        </Link>
      </div>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/tools">Tools</Link>
        <Link to="/faq">FAQ & Reviews</Link>
      </nav>

      <div className="action-icon-container" onClick={openTaskInput}>
        <img src={require("../assets/icon.png")} alt="Plus-Icon" />
      </div>
    </header>
  );
};

export default Header;
