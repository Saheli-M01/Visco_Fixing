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
      // Update navbar background
      setScrolled(window.scrollY > 20);
      
      // Get all sections
      const sections = [
        { id: "home", link: "home" },
        { id: "about", link: "about" },
        { id: "feature", link: "feature" },
        { id: "topic", link: "topic" },
        { id: "contact", link: "contact" }
      ];
      
      // Get viewport height
      const viewportHeight = window.innerHeight;
      
      // Find the current section in view
      let currentSection = "home";
      let maxVisibility = 0;
      
      for (const { id, link } of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          
          // Calculate how much of the section is visible in the viewport
          const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
          const visibility = visibleHeight > 0 ? visibleHeight / element.offsetHeight : 0;
          
          // If this section is more visible than the current max, update the active section
          if (visibility > maxVisibility) {
            maxVisibility = visibility;
            currentSection = link;
          }
        }
      }
      
      // Only update if we have a significant portion of a section visible
      if (maxVisibility > 0.2) {
        setActiveLink(currentSection);
      }
    };

    // Add scroll event listener with throttling
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", scrollListener);
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener("scroll", scrollListener);
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
