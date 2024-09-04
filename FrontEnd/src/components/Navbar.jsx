import React from "react";
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-black">
    <div className="container">
      <Link className="navbar-brand text-white bg-[#5fdf2c]" to={"/"}>Zoo-Land</Link>
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Buscar"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Buscar
        </button>
      </form>
    </div>
  </nav>
  )
}

export default Navbar