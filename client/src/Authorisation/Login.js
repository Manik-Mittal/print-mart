import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import '/Users/manikmittal/Documents/print-mart/client/src/App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../context/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate()
    const [auth, setAuth] = useAuth();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/login", {
                email, password
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.loggedUser,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                // Redirect to home or any other page if login successful
                if (email.endsWith('@admin.com')) {
                    Navigate(`/admin/${email}`);
                } else {
                    Navigate('/home');
                }
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Login Page"}>
            <div className="register1" style={{ maxHeight: '50vh', marginTop: '20vh' }}>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' required />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' required />
                    <button type="submit" className="btn btn-success">Login</button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;