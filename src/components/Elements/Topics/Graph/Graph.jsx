import React from "react";
import { useNavigate } from "react-router-dom";
import "@styles/ElementStyle/_topic.scss";

const Graph = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/graph/explore");
    window.scrollTo(0, 0);
  };

  return (
    <section id="graph" className="topic-section">
      <div className="container">
        <h1 className="text-center">Graph Data Structure</h1>
        <div className="row">
          <div className="col-12">
            <div className="card-content">
              <p className="description">
                A graph is a non-linear data structure consisting of vertices (nodes) and edges. 
                It's used to represent relationships between different objects.
              </p>
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={handleExplore}
              >
                Explore <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Graph;
