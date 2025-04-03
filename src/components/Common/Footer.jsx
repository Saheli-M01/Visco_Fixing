import React from 'react';
import { Container } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { HashLink } from 'react-router-hash-link';
import "../../styles/CommonStyle/_footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-about">
            <h3>Visco</h3>
            <p>A visualization tool for algorithms, making complex concepts easier to understand through interactive animations and step-by-step explorations.</p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <nav>
              <HashLink to="/#home">Home</HashLink>
              <HashLink to="/#about">About</HashLink>
              <HashLink to="/#feature">Features</HashLink>
              <HashLink to="/#topic">Topics</HashLink>
              <HashLink to="/#contact">Contact</HashLink>
            </nav>
          </div>

          <div className="footer-topics">
            <h3>Topics</h3>
            <nav>
              <a href="#">Arrays</a>
              <a href="#">Sorting</a>
              <a href="#">Trees</a>
              <a href="#">Graphs</a>
              <a href="#">Dynamic Programming</a>
            </nav>
          </div>

          <div className="footer-contact">
            <h3>Connect</h3>
            <div className="social-links">
              <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="mailto:visualizecode.official@gmail.com" aria-label="Email">
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
