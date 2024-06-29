import React, { useState, useEffect } from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from './AdminMenu'
import { toast } from 'react-toastify'
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [vendorName, setVendorName] = useState(""); //changed here
  //const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const [adminDetails, setAdminDetails] = useState(null);

  //get all cat
  const getAllCategory = async () => {
    try {

      const { data } = await axios.get("https://print-mart-2.onrender.com/api/v1/vendor/getall-category");
      if (data?.success) {
        setCategories(data?.allCategories);
        console.log(data.allCategories)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();

    // Fetch admin details from local storage
    const adminDetailsString = localStorage.getItem('auth');
    if (adminDetailsString) {
      const adminData = JSON.parse(adminDetailsString);
      setAdminDetails(adminData.existingVendor);

    }
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      //setVendorName(adminDetails._id);

      const productData = new FormData();
      console.log(vendorName, 521)
      console.log(adminDetails, 78)
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("vendorName", adminDetails._id);
      productData.append("imageUrl", photo);
      productData.append("category", category);

      const { data } = axios.post(
        "https://print-mart-2.onrender.com/api/v1/vendor/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard- Create Product"}>
      <div className="create-product-container">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Create Product</h1>
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
                    accept="image/png"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
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
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              {/* <div className="mb-3">
                <input
                  type="string"
                  value={vendorName}
                  placeholder="write name of vendor"
                  className="form-control"
                  onChange={(e) => setVendorName(e.target.value)}
                />
              </div> */}
              {/* <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div> */}
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct