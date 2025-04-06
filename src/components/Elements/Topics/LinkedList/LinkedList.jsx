import React from "react";
import { useNavigate } from "react-router-dom";
import "@styles/ElementStyle/_topic.scss";

const LinkedList = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/linkedlist/explore");
    window.scrollTo(0, 0);
  };

  return (
    <section id="linkedlist" className="topic-section">
      <div className="container">
        <h1 className="text-center">Linked List Data Structure</h1>
        <div className="row">
          <div className="col-12">
            <div className="card-content">
              <p className="description">
                A linked list is a linear data structure where elements are stored in nodes, 
                and each node points to the next node in the sequence.
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

export default LinkedList;
