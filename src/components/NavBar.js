import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.JPG";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
      <Navbar className={styles.NavBar} expand="md" fixed="top">
        <Container>
          <NavLink to="/" className={styles.NavBarBrand}>
            <img src={logo} alt="Fit&Fine Logo" height="100" />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-left">
              <NavLink
                exact
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/"
              >
                <i className="fas fa-home-user"></i> Home
              </NavLink>
              <NavLink
                to="/challenges"
                className={styles.NavLink}
                activeClassName={styles.Active}
              >
                <i className="fas fa-trophy"></i> Challenges
              </NavLink>
              <NavLink
                to="/collaborate"
                className={styles.NavLink}
                activeClassName={styles.Active}
              >
                <i className="fas fa-circle-info"></i> About & Collaborate
              </NavLink>
              <NavLink
                to="/signin"
                className={styles.NavLink}
                activeClassName={styles.Active}
              >
                <i className="fas fa-right-to-bracket"></i> Login
              </NavLink>
              <NavLink
                to="/signup"
                className={styles.NavLink}
                activeClassName={styles.Active}
              >
                <i className="fas fa-user-plus"></i> Register
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default NavBar;
