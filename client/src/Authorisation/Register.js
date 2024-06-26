import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import '/Users/manikmittal/Documents/print-mart/client/src/App.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
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

      const res = await axios.post('/api/v1/user/register', {
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
      <div className="register1">
        <h1>Register</h1>
        <form onSubmit={preventreload}>

          <input type='text'
            value={name} placeholder='Enter Your Name'
            onChange={(e) => setName(e.target.value)} required></input>
          <input type='text' value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' required></input>
          <input type='password' value={password}
            onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' required></input>
          <input type='text' value={phone}
            onChange={(e) => setPhone(e.target.value)} placeholder='Enter Your Phone' required></input>
          <input type='text' value={address}
            onChange={(e) => setAddress(e.target.value)} placeholder='Enter Your Address' required></input>

          <button type="submit" class="btn btn-success" required>Register</button>
          <h5
            style={{ marginTop: '15px', textAlign: 'center', color: 'blue', cursor: 'pointer' }}
            onClick={() => navigate("/admindetails")}
          >
            Register as a seller
          </h5>

        </form>



      </div>
    </Layout>
  )
}

export default Register