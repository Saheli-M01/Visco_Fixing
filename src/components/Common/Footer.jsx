import React from "react";
import { Container } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import "../../styles/CommonStyle/_footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-about">
            <h3>Visco</h3>
            <p>
              A visualization tool for algorithms, making complex concepts
              easier to understand through interactive animations and
              step-by-step explorations.
            </p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <HashLink smooth to="/#home">
                  Home
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#about">
                  About
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#feature">
                  Features
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#topic">
                  Topics
                </HashLink>
              </li>
             
            </ul>
          </div>

          <div className="footer-topics">
            <h3>Topics</h3>
            <ul>
              <li>
                <Link to="/topic/array">Arrays</Link>
              </li>
              <li>
                <Link to="/topic/tree">Trees</Link>
              </li>
              <li>
                <Link to="/topic/graph">Graphs</Link>
              </li>
              <li>
                <Link to="/topic/linkedlist">Linked Lists</Link>
              </li>
              <li>
                <Link to="/topic/sort">Sorting</Link>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Connect</h3>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/saheli-mondal-b9387729b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:visualizecode.official@gmail.com"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {currentYear} Visco. All rights reserved.</p>
          </div>
          <div className="footer-extra-links">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
