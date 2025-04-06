import React from "react";
import { useNavigate } from "react-router-dom";
import "@styles/ElementStyle/_topic.scss";

const Tree = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/tree/explore");
    window.scrollTo(0, 0);
  };

  return (
    <section id="tree" className="topic-section">
      <div className="container">
        <h1 className="text-center">Tree Data Structure</h1>
        <div className="row">
          <div className="col-12">
            <div className="card-content">
              <p className="description">
                A tree is a hierarchical data structure consisting of nodes connected by edges. 
                Each node contains a value and references to other nodes (children).
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

export default Tree;
