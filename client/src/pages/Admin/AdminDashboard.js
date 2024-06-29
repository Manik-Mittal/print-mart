import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import AdminMenu from './AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    // Fetch admin details from local storage
    const adminDetailsString = localStorage.getItem('auth');
    if (adminDetailsString) {
      const adminData = JSON.parse(adminDetailsString);
      setAdminDetails(adminData.Vendor);
    }
  }, []);

  return (
    <Layout>
      <div className="admin-dashboard-container container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75">
              {adminDetails && (
                <>
                  <h3 className='mr-4'>Admin Name: {adminDetails.name}</h3>
                  <h3>Admin Email: {adminDetails.Id}</h3>
                  {/* <h3>GSTIN : {adminDetails.gstNo}</h3>
                  <h3>Pincode of Seller: {adminDetails.pincode}</h3> */}
                  <h3>Registered Address : {adminDetails.address}</h3>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
