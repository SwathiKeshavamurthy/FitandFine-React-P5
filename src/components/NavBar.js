import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.JPG";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../App";


const NavBar = () => {
  const currentUser = useContext(CurrentUserContext);

  const loggedInIcons = <>{currentUser?.username}</>;
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
      <Navbar className={styles.NavBar} expand="md" fixed="top">
        <Container>

          <NavLink to="/" className={styles.NavBarBrand}>
            <img src={logo} alt="Fit&Fine Logo" height="100" />
            <div>
            <h1 className={styles.BrandText}>Fit&Fine</h1>
            <h3 className={styles.BrandTagline}>Set. Sweat. Share. Shine</h3>
            </div>
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
              
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default NavBar;
