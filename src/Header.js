import React from 'react';
import { NavLink } from 'react-router-dom';
import Navigation from './Navigation';

const Header = () => (
  <header>
    <div>
      <nav className="nav-head">
        <img className="logo" src="loanwolf.png" alt="loanwolf" />
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
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </nav>
      <hr />
      <Navigation />
      
      
      i am here
    </div>
  </header>
);

export default Header;
