import React from "react";
import { useNavigate } from "react-router-dom";
import "@styles/ElementStyle/_topic.scss";

const Array = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/array/explore");
    window.scrollTo(0, 0);
  };

  return (
    <section id="array" className="topic-section">
      <div className="container">
        <h1 className="text-center">Array Data Structure</h1>
        <div className="row">
          <div className="col-12">
            <div className="card-content">
              <p className="description">
                An array is a collection of items stored at contiguous memory locations. 
                The idea is to store multiple items of the same type together.
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

export default Array;
