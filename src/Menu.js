import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => (
  <ul className="menu-links">
    <li>
      <NavLink to="/personal-loans">Personal Loans</NavLink>
    </li>
    <li>
      <NavLink to="/business-loans">Business Loans</NavLink>
    </li>
    <li>
      <NavLink to="/car-loans">Car Loans</NavLink>
    </li>
    <li>
      <NavLink to="/mortgage-loans">Mortgage Loans</NavLink>
    </li>
    <li>
      <NavLink to="/consolidation-loans">Consolidation Loans</NavLink>
    </li>
    <br />
    <hr />
  </ul>
);

export default Menu;
