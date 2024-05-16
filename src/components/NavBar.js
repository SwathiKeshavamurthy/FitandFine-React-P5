import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";
import logo from "../assets/logo.JPG";
import styles from "../styles/NavBar.module.css";
import Avatar from "./Avatar";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      history.push("/");
    } catch (err) {
      console.error('Sign out failed: ', err);
    }
  };

  return (
    <Navbar className={styles.NavBar} expand="lg" fixed="top">
      <Container>
        <NavLink to="/" className={styles.NavBarBrand}>
          <img src={logo} alt="Fit&Fine Logo" height="70" />
          <div>
            <h1 className={styles.BrandText}>Fit&Fine</h1>
            <h3 className={styles.BrandTagline}>Set. Sweat. Share. Shine</h3>
          </div>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active}>
              <i className="fas fa-home"></i> Home
            </NavLink>
            <NavLink to="/challenges" className={styles.NavLink} activeClassName={styles.Active}>
              <i className="fas fa-trophy"></i> Challenges
            </NavLink>
            <NavLink to="/collaborate" className={styles.NavLink} activeClassName={styles.Active}>
              <i className="fas fa-info-circle"></i> About & Collaborate
            </NavLink>

            {currentUser ? (
              <>
                <NavLink to="/posts/create" className={styles.NavLink} activeClassName={styles.Active}>
                  <i className="fas fa-plus-circle"></i> Add Post
                </NavLink>
                <NavLink to="/daily-routine" className={styles.NavLink} activeClassName={styles.Active}>
                  <i className="fas fa-calendar-alt"></i> Add Daily Routine
                </NavLink>
                <NavDropdown title={<><Avatar src={currentUser?.profile_image} text={currentUser?.username} height={40} /></>} id="basic-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/profile">
                    <i className="fas fa-user-circle"></i> My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/profile/feed">
                    <i className="fas fa-rss"></i> My Feed
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/profile/likes">
                    <i className="fas fa-heart"></i> My Likes
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/profile/challenges">
                    <i className="fas fa-trophy"></i> My Challenges
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/profile/daily-routine">
                    <i className="fas fa-calendar-day"></i> My Daily Routine
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleSignOut}>
                    <i className="fas fa-sign-out-alt"></i> Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavLink to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
                  <i className="fas fa-sign-in-alt"></i> Sign in
                </NavLink>
                <NavLink to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
                  <i className="fas fa-user-plus"></i> Sign up
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
