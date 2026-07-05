import Layout from '../Layout/Layout'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { BsPrinterFill } from "react-icons/bs";
import { MdOutlineBadge, MdOutlineLocationOn, MdOutlinePinDrop, MdOutlineStorefront } from "react-icons/md";

const Aboutseller = () => {
  const params = useParams();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sellerDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://print-mart-2.onrender.com/api/v1/vendor/get-vendor/${params.vendorName}`);

        if (data?.success) {
          setSeller(data.fetchedVendor);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    sellerDetails();
  }, [params.vendorName]);

  const sellerName = seller?.vendorName || "Seller";
  const initials = sellerName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <Layout>
      <main className="seller-page">
        <section
          className="seller-hero"
          style={{ backgroundImage: 'linear-gradient(rgba(2, 45, 26, 0.84), rgba(11, 96, 176, 0.68)), url("/images/category.jpeg")' }}
        >
          <div className="seller-hero-content">
            <span className="seller-eyebrow">
              <BsPrinterFill />
              Printing Partner
            </span>
            <h1>Seller details</h1>
            <p>Review vendor information before sending your printing enquiry.</p>
          </div>
        </section>

        {loading ? (
          <div className="seller-state">Loading seller details...</div>
        ) : !seller ? (
          <div className="seller-state">Seller details are not available right now.</div>
        ) : (
          <section className="seller-profile">
            <div className="seller-summary">
              <div className="seller-avatar">{initials || "PM"}</div>
              <div>
                <span>Vendor profile</span>
                <h2>{sellerName}</h2>
                <p>{seller.about || "This seller has not added a detailed profile yet."}</p>
              </div>
            </div>

            <div className="seller-details-grid">
              <article className="seller-detail-card">
                <MdOutlineStorefront />
                <span>Business name</span>
                <strong>{sellerName}</strong>
              </article>

              <article className="seller-detail-card">
                <MdOutlineLocationOn />
                <span>Address</span>
                <strong>{seller.address || "Not provided"}</strong>
              </article>

              <article className="seller-detail-card">
                <MdOutlinePinDrop />
                <span>Pincode</span>
                <strong>{seller.pincode || "Not provided"}</strong>
              </article>

              <article className="seller-detail-card">
                <MdOutlineBadge />
                <span>GST number</span>
                <strong>{seller.gstNo || "Not provided"}</strong>
              </article>
            </div>

            <div className="seller-about">
              <h3>About seller</h3>
              <p>{seller.about || "No additional seller description has been added."}</p>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}

export default Aboutseller
