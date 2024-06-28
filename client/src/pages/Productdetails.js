import { useAuth } from '../context/auth';
import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { toast } from 'react-toastify';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import '/Users/manikmittal/Documents/print-mart/client/src/style/productstyle.css';

const Productdetails = () => {
    const [auth] = useAuth();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [id, setId] = useState("");
    const [quantity, setQty] = useState("");
    const [paperQuality, setQuality] = useState("");
    const [colorType, setColor] = useState("");
    const [lamination, setLamination] = useState(false);
    const [city, setCity] = useState("");
    const [click, setClick] = useState(false);
    const [vendorName, setvendorName] = useState("");
    const [pdf, setPdf] = useState(null);
    const navigate = useNavigate();
    const params = useParams();

    const getProduct = async () => {
        try {
            if (!params.slug) return;
            const { data } = await axios.get(`http://localhost:8000/api/v1/vendor/get-products/${params.slug}`);
            if (Array.isArray(data.singleProduct) && data.singleProduct.length > 0) {
                const p = data.singleProduct[0];

                setName(p.name);
                setDescription(p.description);
                setPrice(p.productPrice);
                setId(p._id);
                setvendorName(p.vendorName._id);


            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getProduct();
        };
        fetchData();
    }, [params.slug]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!auth.user) {

            toast.error("Login First");
            navigate("/login");
            return;
        }

        const formData = new FormData();
        formData.append('customerName', auth.user._id);
        formData.append('productName', id);
        formData.append('vendorName', vendorName);
        formData.append('quantity', quantity);
        formData.append('paperQuality', paperQuality);
        formData.append('colorType', colorType);
        formData.append('lamination', lamination);
        formData.append('city', city);

        if (pdf) {
            formData.append('pdf', pdf);
        }
        console.log(pdf)
        try {
            const response = await axios.post('http://localhost:8000/api/v1/user/create-quotation', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            toast.success('Order Placed');

        } catch (error) {
            console.error('Error creating quotation:', error);
            toast.error("Something went wrong");

        }
    };

    return (
        <Layout>

            <div className="row container entire-box" style={{ marginTop: '5vh', display: 'flex', width: '30vw' }}>
                <h1 className="product-title " style={{ marginLeft: '7vw' }}>Product Details</h1>
                <h1 className="product-title " style={{ marginLeft: '0vw', textAlign: 'center' }}>{name}</h1>
                <div className="product-details">
                    <div className="product-image">
                        <img src={`http://localhost:8000/api/v1/vendor/get-product-image/${id}`} className="card-img-top" alt={name} height="400px" width="10px" />
                    </div>
                    <div className="product-info">
                        <div className="product-description">
                            <h2 style={{ display: "inline", margin: '5px', width: '600px' }}>Price : </h2> {price}
                        </div>
                        <div className="product-description">
                            <h2 style={{ display: "inline", margin: '5px', width: '600px' }}>Description : </h2> {description}
                        </div>

                        {!click && (
                            <button className="btn btn-place btn-danger add" onClick={() => setClick(true)} style={{ marginTop: '50px', marginLeft: '20px' }}>
                                SEND QUOTATION

                            </button>

                        )}

                    </div>
                </div>
                {click && (
                    <form onSubmit={handleSubmit} className="order-form">

                        <div className="user-info1">
                            <h1 className="product-title " style={{ marginLeft: '4vw', marginTop: '5vh' }}>Quotation Details</h1>
                            <div className="form-field">
                                <label className="form-label">Quantity:</label>
                                <input type="number" value={quantity} onChange={(e) => setQty(e.target.value)} className="form-input" placeholder="Quantity in pcs" min={100} />
                            </div>
                            <div className="form-field">
                                <label className="form-label">Color Type:</label>
                                <input type="text" value={colorType} onChange={(e) => setColor(e.target.value)} className="form-input" placeholder="Color type" />
                            </div>
                            <div className="form-field">
                                <label className="form-label">City:</label>
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-input" placeholder="City" />
                            </div>
                            <div className="form-field">
                                <label className="form-label">Paper Quality:</label>
                                <input type="text" value={paperQuality} onChange={(e) => setQuality(e.target.value)} className="form-input" placeholder="Paper quality in GSM" />
                            </div>
                            <div className="form-field">
                                <label className="form-label">Lamination:</label>
                                <input type="checkbox" checked={lamination} onChange={(e) => setLamination(e.target.checked)} className="form-checkbox" />
                            </div>
                            <div className="form-field">
                                <label className="form-label">Have your Own Design ?</label>
                                <input type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} className="form-file" />
                            </div>
                        </div>
                        <div className="below">
                            <button type="submit" className="btn-place">Send Quotation</button>
                        </div>
                    </form>
                )}
            </div>

        </Layout>
    )
}

export default Productdetails;
