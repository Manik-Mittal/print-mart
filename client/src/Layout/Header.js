import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import '/Users/manikmittal/Documents/Printing-Mart/client/src/App.css'
import { BsPrinterFill } from "react-icons/bs";
import { useAuth } from "../../context/auth";
import { FaUserLarge } from "react-icons/fa6";
import {toast} from 'react-toastify'
const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate=useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/home")
  };
  
  return (
    <div>
      <nav className="navbar">
      <div className="company-name"> <BsPrinterFill/>  Printing Mart </div>
      <ul className="nav-links">
        <li><NavLink to='/home'>Home</NavLink></li>
        <li><a href='/home/#servicesSection'>Categories</a></li>
        
        {!auth?.user ? (
                <>
                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/register'>Register</NavLink></li>
                
                </>
              ) : (<></>)
              } 
        {auth?.user ? (
                <>
                <li><NavLink to='/profile'> <FaUserLarge size='30' /></NavLink></li>
                <button className="btn btn-danger"
                          onClick={handleLogout}>
                           
                          Logout
                        </button>
                
                </>
              ) : (<></>)
              }

 
      </ul>
    </nav>
    </div>
  )
}

export default 
Header