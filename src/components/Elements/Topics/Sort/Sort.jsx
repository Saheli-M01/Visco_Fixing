import React from "react";
import { useNavigate } from "react-router-dom";
import "@styles/ElementStyle/_topic.scss";

const Sort = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/sort/explore");
    window.scrollTo(0, 0);
  };

  return (
    <section id="sort" className="topic-section">
      <div className="container">
        <h1 className="text-center">Sorting Algorithms</h1>
        <div className="row">
          <div className="col-12">
            <div className="card-content">
              <p className="description">
                Sorting algorithms are used to arrange elements of an array/list in a specific order. 
                They are fundamental to computer science and are used in many applications.
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

export default Sort;
