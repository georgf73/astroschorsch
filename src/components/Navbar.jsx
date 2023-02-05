import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { ReactComponent as OfferIcon } from "./assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "./assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "./assets/svg/personOutlineIcon.svg";
const Navbar = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }
  return (
    <footer className={styles.navbar}>
      <nav className={styles.navbarNav}>
        <ul className={styles.navbarListItems}>
          <li className={styles.navbarListItem} onClick={() => navigate('/')}>
            <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c"' : '#8f8f8f'} width="36px" height="36px" />
            <p className={pathMatchRoute('/') ? styles.navbarListItemNameActive : styles.navbarListItemName}>Home</p>
          </li>
          <li className={styles.navbarListItem} onClick={() => navigate('/objects')}>
            <OfferIcon fill={pathMatchRoute('/objects') ? '#2c2c2c"' : '#8f8f8f'} width="36px" height="36px" />
            <p>Objects</p>
          </li>
          <li className={styles.navbarListItem} onClick={() => navigate('/profile')}>
            <PersonOutlineIcon fill={pathMatchRoute('/profile') ? '#2c2c2c"' : '#8f8f8f'} width="36px" height="36px" />
            <p>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
