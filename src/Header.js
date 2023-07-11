import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <nav className="nav-head">
      <h1>Company Name</h1>
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
      <div className="login-signup">
        <button className="login" type="submit">
          Login
        </button>
        <button className="signup" type="submit">
          Sign Up
        </button>
      </div>
    </nav>
  </header>
);

export default Header;
