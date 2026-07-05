import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from '../Layout/Layout'
import axios from "axios";
import '../style/home.css'
import { BsArrowRight, BsGrid3X3Gap } from "react-icons/bs";
import { MdOutlineDesignServices, MdOutlineLocalShipping, MdOutlineVerified } from "react-icons/md";

const API_URL = "https://print-mart-2.onrender.com";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/api/v1/vendor/get-products`);
      setProducts(data.allProduct || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/vendor/getall-category`);
      if (data?.success) {
        setCategories(data.allCategories || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") {
      return products;
    }

    return products.filter((product) => product.category?.name === activeCategory);
  }, [activeCategory, products]);

  useEffect(() => {
    getAllProducts();
    getAllCategory();
  }, []);

  return (
    <Layout>
      <main className="home-page">
        <div className='banner' style={{ position: 'relative' }}>
          <video
            style={{ width: '100vw', height: '92vh', objectFit: 'cover' }}
            autoPlay
            loop
            muted
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
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

        <section className="home-section home-service-strip">
          <div className="service-item">
            <MdOutlineDesignServices />
            <div>
              <h3>Custom print jobs</h3>
              <p>Send requirements and artwork directly from the product page.</p>
            </div>
          </div>
          <div className="service-item">
            <MdOutlineVerified />
            <div>
              <h3>Verified sellers</h3>
              <p>View seller details before enquiring about a product.</p>
            </div>
          </div>
          <div className="service-item">
            <MdOutlineLocalShipping />
            <div>
              <h3>Local fulfilment</h3>
              <p>Connect with print providers for practical order discussions.</p>
            </div>
          </div>
        </section>

        <section className="home-section" id="servicesSection">
          <div className="section-heading">
            <span>Services</span>
            <h2>Choose a print category</h2>
            <p>Filter the catalog by product type or view every available option.</p>
          </div>

          <div className="category-grid">
            <button
              type="button"
              className={`category-card ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              <div className="category-card-icon">
                <BsGrid3X3Gap />
              </div>
              <span>All Products</span>
            </button>

            {categories.map((category) => (
              <button
                type="button"
                key={category._id}
                className={`category-card ${activeCategory === category.name ? "active" : ""}`}
                onClick={() => setActiveCategory(category.name)}
              >
                <img src="/images/category1.jpeg" alt={category.name} />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="home-section products-section">
          <div className="section-heading section-heading-row">
            <div>
              <span>Catalog</span>
              <h2>{activeCategory === "all" ? "All products" : activeCategory}</h2>
            </div>
            <p>{filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"} available</p>
          </div>

          {loading ? (
            <div className="product-state">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="product-state">No products found for this category.</div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product._id}>
                  <div className="product-image-wrap">
                    <img src={`${API_URL}/api/v1/vendor/get-product-image/${product._id}`} alt={product.name} />
                    <span>{product.category?.name || "Printing"}</span>
                  </div>
                  <div className="product-card-body">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-actions">
                      <button type="button" className="home-primary-btn small" onClick={() => navigate(`/productdetails/${product.slug}`)}>
                        Enquire <BsArrowRight />
                      </button>
                      <button type="button" className="home-secondary-btn small" onClick={() => navigate(`/aboutseller/${product.vendorName._id}`)}>
                        About seller
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </Layout >
  );
}

export default Home;
