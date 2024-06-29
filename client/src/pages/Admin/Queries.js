import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import AdminMenu from './AdminMenu';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

const Queries = () => {
  const [quotations, setQuotations] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState(null);




  useEffect(() => {
    fetchLoggedInUser();

  }, []);

  const fetchData = async (email) => {
    try {
      console.log("Fetching data for email:", email);
      const response = await axios.get(`http://localhost:8000/api/v1/user/get-quotations/${email}`);
      setQuotations(response.data.quotation);
      console.log(response.data.quotation, "iuiydidd");
    } catch (error) {
      console.error('Error fetching data in Queries.js:', error);
      toast.error("Something went wrong while fetching data");
    }
  };

  const fetchLoggedInUser = () => {
    const loggedInUserInfoString = localStorage.getItem('auth');
    if (loggedInUserInfoString) {
      console.log("hi from anadar");
      const loggedInUserInfo = JSON.parse(loggedInUserInfoString);
      if (loggedInUserInfo && loggedInUserInfo.existingVendor) {
        setLoggedInUser(loggedInUserInfo);
        setEmail(loggedInUserInfo.existingVendor.email);
        fetchData(loggedInUserInfo.existingVendor.email);
      } else {
        console.error('Logged-in user information is invalid:', loggedInUserInfo);
      }
    } else {
      console.error('User information not found in local storage.');
    }
  };

  const downloadPDF = (pdfData, fileName) => {
    try {
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error("Error downloading PDF");
    }
  };
  const bgImageStyle = {
    backgroundImage: `url('/ffl.png')`, // Path to your background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px'
  };

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="row" style={bgImageStyle}>
        <div className="col-md-3">
          <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <AdminMenu />
          </div>
        </div>
        <div className="col-md-9">
          <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 className="text-center">Quotation Details</h2>
            {quotations.map(quotation => (
              <div key={quotation._id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Quotation</h5>
                  <p className="card-text"><strong>Customer Name:</strong> {quotation.customerName.name}</p>
                  <p className="card-text"><strong>Product Name:</strong> {quotation.productName.name}</p>
                  <p className="card-text"><strong>Vendor Name:</strong> {quotation.vendorName.vendorName}</p>
                  <p className="card-text"><strong>Quantity:</strong> {quotation.quantity}</p>
                  <p className="card-text"><strong>Message:</strong> {quotation.message}</p>
                  <p className="card-text"><strong>Color Type:</strong> {quotation.colorType}</p>
                  <p className="card-text"><strong>Paper Quality:</strong> {quotation.paperQuality}</p>
                  <p className="card-text"><strong>Lamination:</strong> {quotation.lamination ? 'Yes' : 'No'}</p>
                  <p className="card-text"><strong>City:</strong> {quotation.city}</p>
                  <div className="card-text">
                    {quotation.pdf && (
                      <button className="btn btn-primary mr-2" onClick={() => downloadPDF(quotation.pdf.data, `${quotation._id}.pdf`)}>
                        Download PDF
                      </button>
                    )}
                  </div>
                  <div>
                    {/* <button className="btn btn-primary mr-2">Edit</button> */}
                    <button className="btn btn-danger mr-2">Delete</button>
                    <button className="btn btn-success">Completed</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Queries;