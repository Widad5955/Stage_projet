
import React from "react";
import "../assest/styles/header.css";
import logo from "../assest/images/logo.png";
import { Link } from "react-router-dom"; // Importer Link
const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Royaume du Maroc" className="logo" />
      </div>
      <nav className="header-nav">
      <Link to="/articles">Articles </Link>
        <Link to="/mouvements">Mouvements</Link>
      </nav>
    </header>
  );
};
export default Header;



