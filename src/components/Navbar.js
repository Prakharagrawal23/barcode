import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">Home</li>
        <li className="navbar-item">About</li>
        <li className="navbar-item" onMouseEnter={toggleServicesDropdown} onMouseLeave={toggleServicesDropdown}>
          Services
          {isServicesOpen && (
            <ul className="dropdown-menu">
              <li className="dropdown-item">Web Development</li>
              <li className="dropdown-item">Mobile Development</li>
              <li className="dropdown-item">UI/UX Design</li>
            </ul>
          )}
        </li>
        <li className="navbar-item">Contact</li>
        <li className="navbar-item">Blog</li>
        <li className="navbar-item">FAQ</li>
      </ul>
    </nav>
  );
}

export default Navbar;
