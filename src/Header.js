import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom/dist';

function Header() {

  let navigate = useNavigate();

  const loginRoute = () => {
    let path = '/login';
    navigate(path);
  }
  
  const signupRoute = () => {
    let path = '/signup';
    navigate(path);
  }

  return (
    <header>
      <nav className="nav-head">
        <img className="logo" src="loanwolf.png" alt="loanwolf"/>
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
          <button className="login" type="submit" onClick={loginRoute}>
            Login
          </button>
          <button className="signup" type="submit" onClick={signupRoute}>
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}


export default Header;
