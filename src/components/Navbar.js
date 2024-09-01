import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">Home</li>
        <li className="navbar-item">About</li>
        <li className="navbar-item">Services</li>
        <li className="navbar-item">Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;
