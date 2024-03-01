import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import logo  from "../assets/FlyHi-Logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons";

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  return (
    <>
        <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
            <div className="navbar-container container">
                <Link to="/" className="navbar-logo" alt="logo">
                    <a href="/"><img src={logo} alt="logo" onClick={closeMobileMenu}/></a>
                </Link>

            </div>
            <div className="menu-icon" onClick={handleClick}>
                {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                    <NavLink to="/" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu} >
                        Home
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/booking" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu} >
                        Booking
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/payments" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu} >
                        Payments
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/help" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>
                        Help
                    </NavLink>
                </li>
            </ul>
        </nav>
        </IconContext.Provider>
    </>
  );
}

export default Navbar