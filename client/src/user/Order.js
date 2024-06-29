// import Usermenu from "../Layout/Usermenu";
// import Layout from "../Layout/Layout";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from "react-router-dom";

// const Order = () => {
//   const [quotations, setQuotations] = useState([]);
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [email, setEmail] = useState(null);

//   useEffect(() => {
//     fetchLoggedInUser();
//   }, []);

//   const fetchData = async (email) => {
//     try {
//       console.log("Fetching data for email:", email);
//       const response = await axios.get(`http://localhost:8000/api/v1/user/get-quotations-customer/${email}`);
//       setQuotations(response.data.quotation);
//       console.log(response.data.quotation, "iuiydidd");
//     } catch (error) {
//       console.error('Error fetching data in Queries.js:', error);
//     }
//   };


//   const fetchLoggedInUser = () => {

//     const loggedInUserInfoString = localStorage.getItem('auth');

//     if (loggedInUserInfoString) {

//       const loggedInUserInfo = JSON.parse(loggedInUserInfoString);
//       console.log(loggedInUserInfo.loggedUser, 8998)
//       if (loggedInUserInfo && loggedInUserInfo.loggedUser) {
//         setLoggedInUser(loggedInUserInfo);
//         setEmail(loggedInUserInfo.loggedUser.email);
//         console.log(email, 'email')
//         fetchData(loggedInUserInfo.loggedUser.email);
//       } else {
//         console.error('Logged-in user information is invalid:', loggedInUserInfo);
//       }
//     } else {
//       console.error('User information not found in local storage.');
//     }
//   };

//   // const downloadPDF = (pdfData, fileName) => {
//   //   try {


//   //     const blob = new Blob([pdfData], { type: 'application/pdf' });
//   //     const url = URL.createObjectURL(blob);
//   //     const a = document.createElement('a');
//   //     a.href = url;
//   //     a.download = fileName;
//   //     document.body.appendChild(a);
//   //     a.click();
//   //     window.URL.revokeObjectURL(url);
//   //   } catch (error) {
//   //     console.error('Error downloading PDF:', error);
//   //   }
//   // };

//   const convertToUint8Array = (data) => {
//     console.log("Data type:", typeof data);
//     console.log("Data content:", data);

//     if (data instanceof ArrayBuffer) {
//       console.log("Data is an ArrayBuffer");
//       return new Uint8Array(data);
//     } else if (typeof data === 'string') {
//       console.log("Data is a string, assuming base64 encoded");
//       const binaryString = atob(data);
//       const len = binaryString.length;
//       const bytes = new Uint8Array(len);
//       for (let i = 0; i < len; i++) {
//         bytes[i] = binaryString.charCodeAt(i);
//       }
//       return bytes;
//     } else if (Array.isArray(data)) {
//       console.log("Data is an array");
//       return new Uint8Array(data);
//     } else if (data instanceof Uint8Array) {
//       console.log("Data is already a Uint8Array");
//       return data;
//     } else if (data && data.type === 'Buffer' && Array.isArray(data.data)) {
//       console.log("Data is a Node.js Buffer object");
//       return new Uint8Array(data.data);
//     } else {
//       console.error('Unsupported data format:', data);
//       throw new Error('Unsupported data format');
//     }
//   };

//   const downloadPDF = (pdfData, fileName) => {
//     try {
//       // Convert pdfData to Uint8Array if it's not already
//       if (!(pdfData instanceof Uint8Array)) {
//         pdfData = convertToUint8Array(pdfData);
//       }

//       // Create the Blob from the Uint8Array
//       const blob = new Blob([pdfData], { type: 'application/pdf' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = fileName;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
//     } catch (error) {
//       console.error('Error downloading PDF:', error);
//     }
//   };

//   return (
//     <Layout title={"Dashboard - All Users"}>
//       <div className="row">
//         <div className="col-md-3">
//           <Usermenu />
//         </div>
//         <div className="col-md-9">
//           <h2>Quotation Details</h2>
//           {/* {console.log(quotations,9848)} */}
//           {quotations.map(quotation => (
//             <div key={quotation._id} className="card mb-3">
//               <div className="card-body">
//                 <h5 className="card-title">Quotation</h5>
//                 {console.log(quotation)}
//                 <p className="card-text"><strong>Customer Name:</strong> {quotation.customerName.userName}</p>
//                 {/* <p className="card-text"><strong>Product Name:</strong> {quotation.productName._id}</p>  */}
//                 <p className="card-text"><strong>Vendor Name:</strong> {quotation.vendorName.vendorName}</p>
//                 <p className="card-text"><strong>Quantity:</strong> {quotation.quantity}</p>
//                 <p className="card-text"><strong>Message:</strong> {quotation.message}</p>
//                 <p className="card-text"><strong>Color Type:</strong> {quotation.colorType}</p>
//                 <p className="card-text"><strong>Paper Quality:</strong> {quotation.paperQuality}</p>
//                 <p className="card-text"><strong>Lamination:</strong> {quotation.lamination ? 'Yes' : 'No'}</p>
//                 <p className="card-text"><strong>City:</strong> {quotation.city}</p>
//                 <div className="card-text">
//                   {quotation.pdf && (
//                     <>
//                       <button className="btn btn-primary mr-2" onClick={() => downloadPDF(quotation.pdf.data, `${quotation._id}.pdf`)}>
//                         Download PDF
//                       </button>

//                     </>


//                   )}
//                   <button className="btn btn-primary mr-2" onClick={() => downloadPDF(quotation, `${quotation._id}.pdf`)}>
//                     Download Quotation
//                   </button>

//                 </div>

//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default Order;

import Usermenu from "../Layout/Usermenu";
import Layout from "../Layout/Layout";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useParams } from "react-router-dom";

const Order = () => {
  const [quotations, setQuotations] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  const fetchData = async (email) => {
    try {
      console.log("Fetching data for email:", email);
      const response = await axios.get(`http://localhost:8000/api/v1/user/get-quotations-customer/${email}`);
      setQuotations(response.data.quotation);
      console.log(response.data.quotation, "iuiydidd");
    } catch (error) {
      console.error('Error fetching data in Queries.js:', error);
    }
  };

  const fetchLoggedInUser = () => {
    const loggedInUserInfoString = localStorage.getItem('auth');

    if (loggedInUserInfoString) {
      const loggedInUserInfo = JSON.parse(loggedInUserInfoString);
      console.log(loggedInUserInfo.loggedUser, 8998)
      if (loggedInUserInfo && loggedInUserInfo.loggedUser) {
        setLoggedInUser(loggedInUserInfo);
        setEmail(loggedInUserInfo.loggedUser.email);
        console.log(email, 'email')
        fetchData(loggedInUserInfo.loggedUser.email);
      } else {
        console.error('Logged-in user information is invalid:', loggedInUserInfo);
      }
    } else {
      console.error('User information not found in local storage.');
    }
  };

  const convertToUint8Array = (data) => {
    console.log("Data type:", typeof data);
    console.log("Data content:", data);

    if (data instanceof ArrayBuffer) {
      console.log("Data is an ArrayBuffer");
      return new Uint8Array(data);
    } else if (typeof data === 'string') {
      console.log("Data is a string, assuming base64 encoded");
      const binaryString = atob(data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    } else if (Array.isArray(data)) {
      console.log("Data is an array");
      return new Uint8Array(data);
    } else if (data instanceof Uint8Array) {
      console.log("Data is already a Uint8Array");
      return data;
    } else if (data && data.type === 'Buffer' && Array.isArray(data.data)) {
      console.log("Data is a Node.js Buffer object");
      return new Uint8Array(data.data);
    } else {
      console.error('Unsupported data format:', data);
      throw new Error('Unsupported data format');
    }
  };

  const downloadPDF = (pdfData, fileName) => {
    try {
      if (!(pdfData instanceof Uint8Array)) {
        pdfData = convertToUint8Array(pdfData);
      }
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const downloadQuotationAsPDF = (quotation) => {
    try {
      const doc = new jsPDF();

      doc.setFontSize(30);
      doc.setFont('bold');
      doc.text('PRINT MART', 75, 20);

      doc.setFontSize(12);
      doc.setFont('bold');

      const tableColumn = ["Field", "Value"];
      const tableRows = [];

      tableRows.push(["Customer Name", quotation.customerName.userName]);
      tableRows.push(["Vendor Name", quotation.vendorName.vendorName]);
      tableRows.push(["Quantity", quotation.quantity]);
      tableRows.push(["Message", quotation.message]);
      tableRows.push(["Color Type", quotation.colorType]);
      tableRows.push(["Paper Quality", quotation.paperQuality]);
      tableRows.push(["Lamination", quotation.lamination ? 'Yes' : 'No']);
      tableRows.push(["City", quotation.city]);

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 40,
      });

      doc.save(`${quotation._id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };


  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="row">
        <div className="col-md-3">
          <Usermenu />
        </div>
        <div className="col-md-9">
          <h2>Quotation Details</h2>
          {quotations.map(quotation => (
            <div key={quotation._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Quotation</h5>
                {console.log(quotation)}
                <p className="card-text"><strong>Customer Name:</strong> {quotation.customerName.userName}</p>
                <p className="card-text"><strong>Vendor Name:</strong> {quotation.vendorName.vendorName}</p>
                <p className="card-text"><strong>Quantity:</strong> {quotation.quantity}</p>
                <p className="card-text"><strong>Message:</strong> {quotation.message}</p>
                <p className="card-text"><strong>Color Type:</strong> {quotation.colorType}</p>
                <p className="card-text"><strong>Paper Quality:</strong> {quotation.paperQuality}</p>
                <p className="card-text"><strong>Lamination:</strong> {quotation.lamination ? 'Yes' : 'No'}</p>
                <p className="card-text"><strong>City:</strong> {quotation.city}</p>
                <div className="card-text">
                  {quotation.pdf && (
                    <button className="btn btn-primary mr-2 " style={{ marginRight: '10px' }} onClick={() => downloadPDF(quotation.pdf.data, `${quotation._id}.pdf`)}>
                      Download PDF
                    </button>
                  )}
                  <button className="btn btn-primary mr-2" onClick={() => downloadQuotationAsPDF(quotation)}>
                    Download Quotation
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Order;
