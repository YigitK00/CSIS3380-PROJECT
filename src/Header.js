import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from './Menu';

const Header = () => (
  <header>
    <div>
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
        <ul className="login-signup">
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/sign-up">Sign up</NavLink>
          </li>
        </ul>
      </nav>
      <hr />
      <Menu />
    </div>
  </header>
);

export default Header;
