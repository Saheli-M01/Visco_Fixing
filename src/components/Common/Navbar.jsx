import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../../Assets/Images/Logo/logo.png";

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Only run section detection on homepage
      if (isHomePage) {
        const sections = ["home", "about", "feature", "topic", "contact"];
        const headerOffset = 100; // Adjust this value based on your navbar height

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const elementTop = element.offsetTop - headerOffset;
            const elementBottom = elementTop + element.offsetHeight;
            const scrollPosition = window.scrollY;

            if (
              scrollPosition >= elementTop &&
              scrollPosition < elementBottom
            ) {
              setActiveLink(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleNavClick = (section) => {
    if (isHomePage) {
      const element = document.getElementById(section);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else {
      // First navigate to home
      navigate("/");
      // Then use setTimeout to ensure the navigation is complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
    setActiveLink(section);
    setExpanded(false);
  };

  // Set initial active link based on URL hash when component mounts
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveLink(hash);
      }
    }
  }, [isHomePage]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".nav-link")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      fixed="top"
      className={`navbar ${scrolled ? "scrolled" : ""}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => handleNavClick("home")}>
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
              onClick={() => handleNavClick("home")}
              className={`nav-link ${activeLink === "home" ? "active" : ""}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => handleNavClick("about")}
              className={`nav-link ${activeLink === "about" ? "active" : ""}`}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => handleNavClick("feature")}
              className={`nav-link ${activeLink === "feature" ? "active" : ""}`}
            >
              Feature
            </Nav.Link>
            <Nav.Link
              onClick={() => handleNavClick("topic")}
              className={`nav-link ${activeLink === "topic" ? "active" : ""}`}
            >
              Topic
              <button
                id="dropdown"
                className={`dropdown-toggle-btn ps-2 ${
                  isDropdownOpen ? "active" : ""
                }`}
                onClick={toggleDropdown}
              >
                <i
                  className={`fas ${
                    isDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <ul className="dropdown-menu show">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/topic/array"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Array
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/topic/tree"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Tree
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/topic/graph"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Graph
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/topic/linkedList"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Linked List
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/topic/sort"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Sorting
                    </Link>
                  </li>
                </ul>
              )}
            </Nav.Link>
            <Nav.Link
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
