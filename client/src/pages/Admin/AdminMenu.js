import React from 'react';
import { toast } from 'react-toastify';
import { useAuth } from "../../context/auth";
import { NavLink, useNavigate } from 'react-router-dom';

const AdminMenu = () => {
  const name = JSON.parse(localStorage.getItem('auth')).Vendor.name

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate('/home'); // Navigate to the home page after logout
  };


  return (

    <div className="text-center">
      <div className="list-group">
        <h4>Admin Panel</h4>
        <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
        <NavLink to={`/dashboard/admin/create-product`} className="list-group-item list-group-item-action">Create Product</NavLink>
        <NavLink to={`/dashboard/admin/products/${name}`} className="list-group-item list-group-item-action">Products</NavLink>
        <NavLink to="/dashboard/admin/queries" className="list-group-item list-group-item-action">Customer Queries</NavLink>
        <button className="btn btn-danger mr-2" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminMenu;
