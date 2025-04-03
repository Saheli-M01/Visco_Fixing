import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
import logo from "../../Assets/Images/Logo/logo.png";

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    // Update navbar background on scroll
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Set up intersection observer for sections
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px",  // Consider section active when it's in the middle of viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = ["home", "about", "feature", "topic", "contact"];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleNavClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
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
