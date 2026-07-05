import React, { useState } from 'react'
import Layout from '../Layout/Layout'
// import '/Users/manikmittal/Documents/print-mart/client/src/App.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { BsPrinterFill } from "react-icons/bs";
import { MdOutlineEmail, MdLockOutline, MdOutlinePerson, MdOutlinePhone, MdOutlineLocationOn } from "react-icons/md";
const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const navigate = useNavigate();
  const preventreload = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post('https://print-mart-2.onrender.com/api/v1/user/register', {
        name,
        email,
        password,
        phone,
        address,
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");

      }
      else {

        toast.error(res.data.message);

      }

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");
    }
  }
  return (
    <Layout>
      <div className="auth-page">
        <section className="auth-panel">
          <div
            className="auth-brand"
            style={{ backgroundImage: 'linear-gradient(rgba(2, 45, 26, 0.82), rgba(11, 96, 176, 0.72)), url("/images/category.jpeg")' }}
          >
            <div className="auth-brand-icon">
              <BsPrinterFill />
            </div>
            <h1>Start printing smarter</h1>
            <p>Create your customer account to request quotes and track your printing needs.</p>
          </div>

          <form className="auth-card" onSubmit={preventreload}>
            <span className="auth-eyebrow">Customer account</span>
            <h2>Register</h2>
            <p className="auth-subtitle">Tell us where to reach you for quotations.</p>

            <label className="auth-field">
              <span>Full name</span>
              <div className="auth-input-wrap">
                <MdOutlinePerson />
                <input type='text'
                  value={name} placeholder='Enter your name'
                  onChange={(e) => setName(e.target.value)} required />
              </div>
            </label>

            <label className="auth-field">
              <span>Email address</span>
              <div className="auth-input-wrap">
                <MdOutlineEmail />
                <input type='email' value={email}
                  onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' required />
              </div>
            </label>

            <label className="auth-field">
              <span>Password</span>
              <div className="auth-input-wrap">
                <MdLockOutline />
                <input type='password' value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder='Create a password' required />
              </div>
            </label>

            <label className="auth-field">
              <span>Phone number</span>
              <div className="auth-input-wrap">
                <MdOutlinePhone />
                <input type='tel' value={phone}
                  onChange={(e) => setPhone(e.target.value)} placeholder='Enter your phone' required />
              </div>
            </label>

            <label className="auth-field">
              <span>Address</span>
              <div className="auth-input-wrap">
                <MdOutlineLocationOn />
                <input type='text' value={address}
                  onChange={(e) => setAddress(e.target.value)} placeholder='Enter your address' required />
              </div>
            </label>

            <button type="submit" className="auth-submit">Create account</button>

            <button type="button" className="auth-secondary-action" onClick={() => navigate("/admindetails")}>
              Register as a seller
            </button>

            <p className="auth-switch">
              Already registered? <Link to="/login">Login</Link>
            </p>
          </form>
        </section>
      </div>
    </Layout>
  )
}

export default Register
