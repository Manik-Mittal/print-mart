import React, { useState, useEffect } from "react";
import Usermenu from "../Layout/Usermenu";
import Layout from "./../Layout/Layout";
import { useAuth } from "../context/auth";
import { toast } from 'react-toastify';
import axios from "axios"
import '../style/user.css'

const Profile = () => {
    const [auth] = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    return (

        <Layout title={"Your Profile"}>
            <div className="col-md-3">
                <Usermenu />
            </div>
            <div className="register2" style={{ marginTop: '0vh' }} >

                <h1>Your Profile</h1>
                <img src='./images/user.png' width={'100px'} height={'auto'} alt="user img" />
                <div className="details">
                    <h4>User Name </h4>
                    <p>{auth?.user?.userName}</p>
                </div>
                <div className="details">
                    <h4>Email Id </h4>
                    <p>{auth?.user?.email}</p>
                </div>
                <div className="details">
                    <h4>Address </h4>
                    <p>{auth?.user?.address}</p>
                </div>





            </div>


        </Layout>
    );
};

export default Profile;