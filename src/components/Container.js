import React from "react";
import "../css/container.css";

const Container = ({ tasksCounter }) => {
  return (
    <div className="container">
      <h1>
        You have <span id="taskCounter">{tasksCounter}</span> tasks today
      </h1>
    </div>
  );
};

export default Container;
