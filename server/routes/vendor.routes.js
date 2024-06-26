import express from "express";
import { 
    createVendor, createCategory, updateCategory, getAllCategories, 
    singleCategory,
    deletingCategory,
    getVendor
} from "../controllers/vendor.controllers.js"
import {
    addProduct, 
    getAllProducts, getSingleProduct, 
    imageProduct
} from "../controllers/product.controllers.js";
import formidable from "express-formidable";
const router = express.Router();

// routes for vendor register and authentication
router.route("/register").post(createVendor);
router.route("/get-vendor/:id").get(getVendor);
// routes for category related functionality of vendor
router.route("/create-category").post(createCategory);
router.route("/update-category/:id").put(updateCategory);
router.route("/getall-category").get(getAllCategories);
router.route("/single-category/:slug").get(singleCategory);
router.route("/delete-category/:id").delete(deletingCategory)

//routes for product related functions
router.post("/create-product",formidable(),addProduct);
router.get("/get-products",getAllProducts);
router.get("/get-products/:slug",getSingleProduct);
router.get("/get-product-image/:id",imageProduct);

export default router;