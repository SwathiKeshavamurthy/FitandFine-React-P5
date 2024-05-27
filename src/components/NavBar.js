import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import logo from "../assets/logo.JPG";
import styles from "../styles/NavBar.module.css";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.error('Sign out failed: ', err);
    }
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Navbar expanded={expanded} expand="lg" ref={ref} className={styles.NavBar} fixed="top">
      <Container>
        <NavLink to="/" className={styles.NavBarBrand} onClick={() => setExpanded(false)}>
          <img src={logo} alt="Fit&Fine Logo" height="70" />
          <div>
            <h1 className={styles.BrandText}>Fit&Fine</h1>
            <h3 className={styles.BrandTagline}>Set. Sweat. Share. Shine.</h3>
          </div>
        </NavLink>
        <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active} onClick={() => setExpanded(false)}>
              <i className="fas fa-home"></i> Home
            </NavLink>
            <NavLink to="/challenges" className={styles.NavLink} activeClassName={styles.Active} onClick={() => setExpanded(false)}>
              <i className="fas fa-trophy"></i> Challenges
            </NavLink>
            <NavLink to="/collaborate" className={styles.NavLink} activeClassName={styles.Active} onClick={() => setExpanded(false)}>
              <i className="fas fa-handshake"></i> About&Collaborate
            </NavLink>
            {currentUser ? (
              <>
                <NavLink to="/posts/create" className={styles.NavLink} activeClassName={styles.Active} onClick={() => setExpanded(false)}>
                  <i className="fas fa-plus-circle"></i> Add Post
                </NavLink>
                <NavLink to="/dailyroutines/create" className={styles.NavLink} activeClassName={styles.Active} onClick={() => setExpanded(false)}>
                  <i className="fas fa-calendar-alt"></i> Add Daily Routine
                </NavLink>
                <NavDropdown title={<Avatar src={currentUser?.profile_image} text={currentUser?.username} height={40} />} id="basic-nav-dropdown" onClick={handleDropdownClick}>
                  <NavDropdown.Item className={styles.CurrentUserDropdownItem} as={NavLink} to={`/profiles/${currentUser?.profile_id}`} onClick={() => setExpanded(false)}>
                    <i className="fas fa-user-circle"></i> My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item className={styles.CurrentUserDropdownItem} as={NavLink} to="/profile/feed" onClick={() => setExpanded(false)}>
                    <i className="fas fa-rss"></i> My Feeds
                  </NavDropdown.Item>
                  <NavDropdown.Item className={styles.CurrentUserDropdownItem} as={NavLink} to="/profile/likes" onClick={() => setExpanded(false)}>
                    <i className="fas fa-heart"></i> My Likes
                  </NavDropdown.Item>
                  <NavDropdown.Item className={styles.CurrentUserDropdownItem} as={NavLink} to="/profile/comments" onClick={() => setExpanded(false)}>
                    <i className="fas fa-comments"></i> My Comments
                  </NavDropdown.Item>
                  <NavDropdown.Item className={styles.CurrentUserDropdownItem} as={NavLink} to="/my-challenges" onClick={() => setExpanded(false)}>
                    <i className="fas fa-trophy"></i> My Challenges
                  </NavDropdown.Item>
                  <NavDropdown.Item className={styles.CurrentUserDropdownItem} as={NavLink} to="/dailyroutines" onClick={() => setExpanded(false)}>
                    <i className="fas fa-calendar-day"></i> My Daily Routine
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className={styles.CurrentUserDropdownItem} onClick={() => { handleSignOut(); setExpanded(false); }}>
                    <i className="fas fa-sign-out-alt"></i> Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavLink to="/signin" className={styles.NavLink} activeClassName={styles.Active} onClick={() => setExpanded(false)}>
                  <i className="fas fa-sign-in-alt"></i> Sign in
                </NavLink>
                <NavLink to="/signup" className={styles.NavLink} activeClassName={styles.Active} onClick={() => setExpanded(false)}>
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
