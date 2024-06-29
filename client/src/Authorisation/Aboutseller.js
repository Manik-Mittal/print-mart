import Layout from '../Layout/Layout'
import React, { useState, useEffect } from "react";
import axios from "axios";
// import '/Users/manikmittal/Documents/print-mart/client/src/App.css'
import { useParams } from 'react-router-dom';


const Aboutseller = () => {
  let p;
  const params = useParams();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState();
  const [gst, setGst] = useState("");
  const [about, setAbout] = useState("");

  const [details, setDetails] = useState([]);
  const sellerDetails = async () => {
    try {

      const { data } = await axios.get(`https://print-mart-2.onrender.com/api/v1/vendor/get-vendor/${params.vendorName}`);
      console.log(data, 5332)
      console.log(data.fetchedVendor.vendorName, 123)

      if (data?.success) {
        setDetails(data);
        console.log(details)
        console.log(details, 'details');
        setName(data.fetchedVendor.vendorName)
        setAddress(data.fetchedVendor.address)
        setPincode(data.fetchedVendor.pincode)
        setGst(data.fetchedVendor.gstNo)
        setAbout(data.fetchedVendor.about)




      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    sellerDetails();

  }, []);
  return (
    <Layout>
      <h1 className='text-center'>Seller details</h1>
      <div className="user-info">
        <div className="field">
          <div className="key">Name:</div>
          <div className="key">Address:</div>
          <div className="key">Pincode:</div>
          <div className="key">Gst Number:</div>
          <div className="key">About Seller:</div>


        </div>
        <div className="value field">

          <div className="key">{name}</div>
          <div className="key">{address}</div>
          <div className="key">{pincode}</div>
          <div className="key">{gst}</div>
          <div className="key">{about}</div>

        </div>
      </div>




    </Layout>
  )
}

export default Aboutseller