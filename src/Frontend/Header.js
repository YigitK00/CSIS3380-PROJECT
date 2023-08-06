import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import { useIsAuthenticated } from 'react-auth-kit';
import { useSignOut } from 'react-auth-kit';

const Authentication = () => {
  const signOut = useSignOut();
  const logout = () => {
    signOut();
    navigate("/login");
  }
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  if (auth) {
    return (
      <ul className="login-signup">
        <li>
          <NavLink onClick={logout}>Logout</NavLink>
        </li>
      </ul>
    );
  }
  else {
    return (
      <ul className="login-signup">
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
      </ul>
    );
  }
}

const Header = () => (
  <header>
    <div>
      <nav className="nav-head">
        <img className="logo" src="/loanwolf.png" alt="loanwolf" />
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
          <li>
            <NavLink to="/support">Support</NavLink>
          </li>
        </ul>
        {/* <ul className="login-signup">
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul> */}
        <Authentication />
      </nav>
      <hr />
      <Navigation />
    </div>
  </header>
);

export default Header;
