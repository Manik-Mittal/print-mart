import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import AdminMenu from './AdminMenu'
import { toast } from 'react-toastify'
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../../context/auth';

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [auth] = useAuth(); // Get the auth object from context



  const [adminDetails, setAdminDetails] = useState(null);

  // Fetch vendor details from session
  // const fetchVendorDetails = () => {
  //   const loggedInUserInfoString = localStorage.getItem('auth');
  //   if (loggedInUserInfoString) {
  //     const loggedInUserInfo = JSON.parse(loggedInUserInfoString);
  //     if (loggedInUserInfo && loggedInUserInfo.Vendor) {
  //       setCategory(loggedInUserInfo.Vendor.Id); // Set category (or any other appropriate field) to vendor ID
  //     } else {
  //       console.error('Logged-in user information is invalid:', loggedInUserInfo);
  //     }
  //   } else {
  //     console.error('User information not found in local storage.');
  //   }
  // };

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://print-mart-2.onrender.com/api/v1/vendor/get-products/${params.slug}`
      );

      if (Array.isArray(data.singleProduct) && data.singleProduct.length > 0) {
        const product = data.singleProduct[0];
        setName(product.name);
        setId(product._id);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    //fetchVendorDetails(); // Call fetchVendorDetails when component mounts
    // Fetch admin details from local storage
    const adminDetailsString = localStorage.getItem('auth');
    if (adminDetailsString) {
      const adminData = JSON.parse(adminDetailsString);
      setAdminDetails(adminData.existingVendor);

    }
  }, []);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://print-mart-2.onrender.com/api/v1/vendor/getall-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {

      console.log(adminDetails._id, 66)


      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      photo && productData.append("imageUrl", photo);
      productData.append("category", category);


      productData.append("vendorName", adminDetails._id); // Pass the admin ID

      console.log("const data ke upar ");
      console.log(id);

      const { data } = await axios.put(
        `https://print-mart-2.onrender.com/api/v1/vendor/update-product/${id}`,
        productData
      );
      console.log(data, 89)

      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {

      console.log(auth)
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure you want to delete this product?");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/vendor/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`https://print-mart-2.onrender.com/api/v1/vendor/get-product-image/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
