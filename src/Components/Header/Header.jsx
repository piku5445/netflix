import React from 'react'
import logo from "../../logo.png"
import {Link} from "react-router-dom"
import { IoSearchOutline } from "react-icons/io5";
const Header = () => {
  
  return (
   
    <nav className='header'>
      <img src={logo} alt="" />
    <div>
      <Link to="/tvshows">TV Shows</Link>
      <Link to="/movies">MOVIES</Link>
      <Link to="/webseries">Web series</Link>
      <Link to="recent ">Recent</Link>
      <Link to="myLsit">My List</Link>
    </div>
    <IoSearchOutline/>
    </nav>
  )
}

export default Header