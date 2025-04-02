import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
import logo from "../../Assets/Images/Logo/logo.png";

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveLink(section);
    setExpanded(false);
  };

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      fixed="top"
      className={`navbar ${scrolled ? "scrolled" : ""}`}
    >
      <Container>
        <Navbar.Brand as={HashLink} to="/#home" onClick={() => handleNavClick("home")}>
          <img src={logo} alt="Visco" height="50" />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={HashLink}
              to="/#home"
              onClick={() => handleNavClick("home")}
              className={`nav-link ${activeLink === "home" ? "active" : ""}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to="/#about"
              onClick={() => handleNavClick("about")}
              className={`nav-link ${activeLink === "about" ? "active" : ""}`}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to="/#feature"
              onClick={() => handleNavClick("feature")}
              className={`nav-link ${activeLink === "feature" ? "active" : ""}`}
            >
              Feature
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to="/#topic"
              onClick={() => handleNavClick("topic")}
              className={`nav-link ${activeLink === "topic" ? "active" : ""}`}
            >
              Topic
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to="/#contact"
              onClick={() => handleNavClick("contact")}
              className={`nav-link ${activeLink === "contact" ? "active" : ""}`}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
