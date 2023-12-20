import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "../css/resources.css";

const ResourcesPage = () => {
  return (
    <>
      <Header></Header>
      <div className="resources-container">
        <h1>Productivity Resources</h1>

        <div className="section">
          <h2>Studies and Articles</h2>
          <div className="resource-box">
            <h2>
              A study by Professors Baumeister and Masicampo from Wake Forest
              University found that making plans to complete tasks can alleviate
              anxiety. Simply writing tasks down can enhance effectiveness. As
              Bechman notes: "Simply writing the tasks down will make you more
              effective.
            </h2>
            <a
              href="http://users.wfu.edu/masicaej/MasicampoBaumeister2011JPSP.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Study Link
            </a>
          </div>
        </div>

        <div className="section">
          <h2>Video Tutorials</h2>
          <div className="video-box">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/iow5V3Qlvwo?si=1izDtnMsNWqtQX1G"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourcesPage;
