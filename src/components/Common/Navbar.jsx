import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
import logo from "../../Assets/Images/Logo/logo.png";

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
          <img src={logo} alt="Visco" height="40" />
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
              className="nav-link"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to="/#about"
              onClick={() => handleNavClick("about")}
              className="nav-link"
            >
              About
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to="/#feature"
              onClick={() => handleNavClick("feature")}
              className="nav-link"
            >
              Feature
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to="/#topic"
              onClick={() => handleNavClick("topic")}
              className="nav-link"
            >
              Topic
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to="/#contact"
              onClick={() => handleNavClick("contact")}
              className="nav-link"
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
