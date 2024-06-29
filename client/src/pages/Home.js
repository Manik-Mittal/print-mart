import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from '../Layout/Layout'
import { useAuth } from '../context/auth'
import axios, { all } from "axios";
import { Checkbox, Radio } from "antd";
import { Link } from "react-router-dom";
// import '/Users/manikmittal/Documents/print-mart/client/src/App.css'
import '../style/home.css'
import { BiSolidCategory } from "react-icons/bi";
const Home = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [radio, setRadio] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState([]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://print-mart-2.onrender.com/api/v1/vendor/get-products`);
      setLoading(false);
      setProducts(data.allProduct);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFilter = (catname) => {
    const filteredProducts = products.filter(product => product.category.name === catname);
    setProducts(filteredProducts);
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://print-mart-2.onrender.com/api/v1/vendor/get-products`);
      setLoading(false);
      setProducts(data.allProduct);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://print-mart-2.onrender.com/api/v1/vendor/getall-category");
      if (data?.success) {
        setCategories(data.allCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className='banner' style={{ position: 'relative' }}>


        <img src="/images/bg.png" style={{ width: '100vw', height: '92vh', opacity: 1 }} alt="Banner" />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '5rem' }} className="typewriter">PRINT YOUR VISION</h1>
          <p style={{ fontSize: '2.5rem' }} className="typewriter">Your one-stop solution for all printing needs</p>
        </div>
        <div style={{ position: 'absolute', bottom: '200px', left: '50%', transform: 'translateX(-50%)', zIndex: 1, textAlign: 'center' }}>

          <a href="#servicesSection" className="btn btn-primary btn-lg">Explore Services</a>
        </div>

        <div id="servicesSection"></div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
      </div>



      {/* ************************************************************************************* */}
      <div className="" style={{ marginTop: '5vh', marginLeft: '40vw' }}>
        <h1 className="text-centre">All Categories</h1>
      </div>

      <div className="row dashboard" id="#servicesSection">

        <div className="">

          <div className="">

            <div className="d-flex" style={{ marginTop: '5vh', marginLeft: '10vw' }}>

              {categories.map((c, index) => (
                <div key={c._id} className="category-button" onClick={() => handleFilter(c.name)}>
                  <div className="category-image-container">
                    {/* <BiSolidCategory /> */}
                    <img src={`/images/category1.jpeg`} alt={c.name} className="category-image" />
                    <div className="category-name">{c.name}</div>
                  </div>
                </div>
              ))}
              <div className="">
                <button className="btn btn-primary " style={{ width: '180px', height: '100px' }} onClick={handleReset}>All Products</button>

              </div>


            </div>
          </div>

        </div>
        {/* ************************************************************************************* */}



        <div className="col-md-10" style={{ marginLeft: '7vw' }}>
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2 d-flex flex-column" style={{ width: "18rem" }} key={p._id}>
                <img src={`/api/v1/vendor/get-product-image/${p._id}`} className="card-img-top" style={{ width: "93%", objectFit: "cover", height: "180px" }} alt={p.name} />
                <div className="card-body d-flex flex-column flex-grow-1">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <div className="mt-auto">
                    <button className="btn btn-danger mb-2 w-100" onClick={() => navigate(`/productdetails/${p.slug}`)}>More Details</button>
                    <button className="btn btn-primary w-100" onClick={() => navigate(`/aboutseller/${p.vendorName._id}`)}>About Seller</button>
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

export default Home;
