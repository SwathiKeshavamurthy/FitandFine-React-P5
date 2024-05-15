import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Helmet } from 'react-helmet';
import logo from "../assets/logo.JPG";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="100" />
          <Helmet>
            <title>Fit&Fine</title>
          </Helmet>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link>
              <i className="fas fa-home-user"></i>Home
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-trophy"></i>Challenges
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-circle-info"></i>About
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-right-to-bracket"></i>Login
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-user-plus"></i>Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;