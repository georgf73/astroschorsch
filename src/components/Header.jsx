import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthStatus } from "../hooks/useAuthStatus";
import "./Header.scss";
import { ReactComponent as PersonOutlineIcon } from "./assets/svg/personOutlineIcon.svg";

function Header() {
  const navigate = useNavigate();
  const { loggedIn } = useAuthStatus();
  const auth = getAuth();


  const logout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <header className="siteheader">
      <div className="container">
        <div className="left">
          <Link to="/" style={{ color: '#FFF', textDecoration: 'none' }}><h2 className="logo">Astroschorsch</h2></Link>
          
          <Link to='/objects' style={{ color: '#FFF', textDecoration: 'none' }}><span>Objekte</span></Link>
          <Link to='/aufnahmen' style={{ color: '#FFF', textDecoration: 'none' }}><span>Bilder</span></Link>
          <span>Tutorials</span>
        </div>

        <div className="right">
          {loggedIn ? (
            <button className="logOutButton" onClick={logout}>
              Logout
            </button>
          ) : (
            <button className="logOut" onClick={logout}>
              Login
            </button>
          )}
          <Link to="/profile">
            <PersonOutlineIcon fill="white" width="36px" height="36px" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
