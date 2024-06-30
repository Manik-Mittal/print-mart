import React, { useState } from 'react'
import Layout from '../Layout/Layout'
// import '/Users/manikmittal/Documents/print-mart/client/src/App.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Admindetails = () => {
    const navigate = useNavigate();
    const [vendorName, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gstNo, setGst] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState()
    const [about, setAbout] = useState("")

    const preventreload = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://print-mart-2.onrender.com/api/v1/vendor/register', {
                vendorName,
                email,
                password,
                gstNo,
                address,
                pincode,
                about
            });

            if (res && res.data.success) {

                toast.success(res.data && res.data.message);

                navigate("/home");

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
            <div className="admin-register-container" style={{ marginTop: '0.5vh', marginBottom: '10vh' }}>
                <div className="admin-form-container">
                    <form onSubmit={preventreload}>
                        <div className="admin-input-group">
                            <h6>Enter your Firm name:</h6>
                            <input type="text" value={vendorName}
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="admin-input-group">
                            <h6>Enter your Email id:</h6>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="admin-input-group">
                            <h6>Enter your Password :</h6>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="admin-input-group">
                            <h6>Enter your address:</h6>
                            <textarea rows='2' cols='50' value={address} onChange={(e) => setAddress(e.target.value)} ></textarea>
                        </div>

                        <div className="admin-input-group">
                            <h6>Enter your pincode:</h6>
                            <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                        </div>
                        <div className="admin-input-group">
                            <h6>Enter your GST details:</h6>
                            <input type="text" value={gstNo} onChange={(e) => setGst(e.target.value)} />
                        </div>

                        <div className="admin-input-group">
                            <h6>Tell us about Yourself:</h6>
                            <textarea rows='5' cols='50' value={about} onChange={(e) => setAbout(e.target.value)}></textarea>

                        </div>
                        <button type="submit" className="admin-submit-btn">Register</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Admindetails;