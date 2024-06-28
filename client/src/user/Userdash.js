import React from "react";
import Layout from "../Layout/Layout";
import Usermenu from "../Layout/Usermenu";
import { useAuth } from "../context/auth";
const Userdash = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-flui m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />

          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              {console.log(auth)}
              <h3>{auth?.user?.userName}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Userdash;