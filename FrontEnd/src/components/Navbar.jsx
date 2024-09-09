import React from "react";
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-black">
    <div className="container">
      <Link className="navbar-brand text-white bg-[#5fdf2c]" to={"/"}>Zoo-Land</Link>
    </div>
  </nav>
  )
}

export default Navbar