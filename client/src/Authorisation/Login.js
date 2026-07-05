import React, { useState } from 'react';
import Layout from '../Layout/Layout';
// import '/Users/manikmittal/Documents/print-mart/client/src/App.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../context/auth";
import { BsPrinterFill } from "react-icons/bs";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate()
    const [auth, setAuth] = useAuth();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://print-mart-2.onrender.com/api/v1/user/login", {
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
            <div className="auth-page">
                <section className="auth-panel auth-panel-login">
                    <div
                        className="auth-brand"
                        style={{ backgroundImage: 'linear-gradient(rgba(2, 45, 26, 0.82), rgba(11, 96, 176, 0.72)), url("/images/category.jpeg")' }}
                    >
                        <div className="auth-brand-icon">
                            <BsPrinterFill />
                        </div>
                        <h1>Welcome back</h1>
                        <p>Sign in to manage enquiries, quotations, and printing orders.</p>
                    </div>

                    <form className="auth-card" onSubmit={handleLogin}>
                        <span className="auth-eyebrow">Printing Mart</span>
                        <h2>Login</h2>
                        <p className="auth-subtitle">Use your registered email and password.</p>

                        <label className="auth-field">
                            <span>Email address</span>
                            <div className="auth-input-wrap">
                                <MdOutlineEmail />
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' required />
                            </div>
                        </label>

                        <label className="auth-field">
                            <span>Password</span>
                            <div className="auth-input-wrap">
                                <MdLockOutline />
                                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' required />
                            </div>
                        </label>

                        <button type="submit" className="auth-submit">Login</button>

                        <p className="auth-switch">
                            New to Printing Mart? <Link to="/register">Create an account</Link>
                        </p>
                    </form>
                </section>
            </div>
        </Layout>
    );
};

export default Login;
