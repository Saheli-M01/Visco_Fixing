import React from "react";
import "../../styles/ElementStyle/_about.scss";
const About = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="row text-center">
          <h1 className="pb-2">About Us</h1>
         
          <h4>
          At Visco, we specialize in visualizing algorithms through dynamic animations and syntax-highlighted code snippets. Our platform helps it easier to understand complex logic through clear, engaging visuals.
          </h4>
          <h5><i className="fa-solid fa-check me-2"></i>Watch algorithms unfold step by step with smooth, real-time visuals.</h5>
          <h5><i className="fa-solid fa-check me-2"></i>Understand intricate processes through intuitive, structured breakdowns.</h5>
          <h5><i className="fa-solid fa-check me-2"></i>Control execution flow, tweak inputs, and see instant results.</h5>
        </div>
      </div>
    </section>
  );
};

export default About;
