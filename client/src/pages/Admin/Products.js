import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu"
import Layout from "../../Layout/Layout";
import axios from "axios";
import { toast } from 'react-toastify'
import { Link, useParams } from "react-router-dom";
import { Params } from "react-router-dom";

const Products = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const name = params.name;
      console.log(name)
      const { data } = await axios.get(`http://localhost:8000/api/v1/vendor/get-products/${name}`);
      setProducts(data.allProduct);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  const bgImageStyle = {
    backgroundImage: `url('/hh.png')`, // Path to your background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px'
  };

  return (
    <Layout>
      <div className="row dashboard" style={bgImageStyle}>
        <div className="col-md-3" >

          <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <AdminMenu />
          </div>
        </div>
        <div className="col-md-9" >

          <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h1 className="text-center">All Products List</h1>
          </div>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8000/api/v1/vendor/get-product-image/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
