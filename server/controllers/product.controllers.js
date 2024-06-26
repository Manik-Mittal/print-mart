// import { Product } from "../models/product.model.js";
// import fs from 'fs';
// import slugify from "slugify";

// export const addProduct = async (req,res) => {
//     try {
//         const {name,description,productPrice,category} = req.fields;
//         const {imageUrl} = req.files; 
//         switch(true){
//             case !name:
//                 return res.status(400).json({success:false,message:"Name is required"});
//             case !description:
//                 return res.status(400).json({success:false,message:"Description is required for the product"});
//             case !productPrice:
//                 return res.status(404).json({success:false,message:"Price of the product is required"});
//             case !category:
//                 return res.status(400).json({success:false,message:"category cannot be empty"});
//             case imageUrl && imageUrl.size > 1000000:
//                 return res.status(404).
//                 json({success:false,message:"photo is required and should be less than 1 mb"});
//         }

//         const products = new Product({...req.fields,slug:slugify(name)});
//         if(imageUrl){
//             products.imageUrl.data = fs.readFileSync(imageUrl.path);
//             products.imageUrl.contentType = imageUrl.type;
//         }


//         await products.save();
//         res.status(200).json({
//             success:true,
//             message: "product added successfully",
//             products
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// // get all the products 
// export const getAllProducts = async (req,res) => {
//     try {
//         // photo is not selected as it will increase the loading time and will hamper the performance
//         const allProduct = await Product.find({}).populate('category').select('-imageUrl').limit(15).sort({createdAt:-1});  
//         // here populate is used as category was a referenced field in schema to show full info of category
//         // not just id
//         res.status(200).json({
//             success: true,
//             message: "all the products are fetched successfully",
//             allProduct
//         })
//     } catch (error) {
//         res.status(500).json({
//             success:false,
//             message: error.message
//         })
//     }
// }

// // get single product
// export const getSingleProduct = async (req,res) => {
//     try {
//         const singleProduct = await Product.find({slug:req.params.slug}).populate('category').select('-imageUrl');
//         res.status(200).json({
//             success: true,
//             message: "Single product fetched",
//             singleProduct
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// //for displaying photo
// export const imageProduct = async (req,res) => {
//     try {
//         // const productImage = await Product.findOne({Id: req.params.Id}).select('imageUrl');
//         const productImage = await Product.findById(req.params.id);
//         if(productImage.imageUrl.data) {
//             // res.set("contentType",productImage.imageUrl.contentType);
//             res.setHeader("Content-Type","image/png")
//             return res.status(200).send(productImage.imageUrl.data);
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
import { Product } from "../models/product.model.js";
import fs from 'fs';
import slugify from "slugify";
import { vendor } from "../models/vendor.model.js";

export const addProduct = async (req, res) => {
    try {
        const { name, description, productPrice, category, vendorName } = req.fields;
        const { imageUrl } = req.files;
        switch (true) {
            case !name:
                return res.status(400).json({ success: false, message: "Name is required" });
            case !description:
                return res.status(400).json({ success: false, message: "Description is required for the product" });
            case !productPrice:
                return res.status(404).json({ success: false, message: "Price of the product is required" });
            case !category:
                return res.status(400).json({ success: false, message: "category cannot be empty" });
            case !vendorName:
                return res.status(400).json({ success: false, message: "Vendor name cannot be empty" });
            case imageUrl && imageUrl.size > 1000000:
                return res.status(404).
                    json({ success: false, message: "photo is required and should be less than 1 mb" });
        }

        const products = new Product({ ...req.fields, slug: slugify(name) });
        if (imageUrl) {
            products.imageUrl.data = fs.readFileSync(imageUrl.path);
            products.imageUrl.contentType = imageUrl.type;
        }

        await products.save();
        res.status(200).json({
            success: true,
            message: "product added successfully",
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get all the products 
export const getAllProducts = async (req, res) => {
    try {
        // photo is not selected as it will increase the loading time and will hamper the performance
        const allProduct = await Product.find({}).populate('category').populate('vendorName').select('-imageUrl').limit(15).sort({ createdAt: -1 });
        // here populate is used as category was a referenced field in schema to show full info of category
        // not just id
        res.status(200).json({
            success: true,
            message: "all the products are fetched successfully",
            allProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get single product
export const getSingleProduct = async (req, res) => {
    try {
        const singleProduct = await Product.find({ slug: req.params.slug }).populate('category').populate('vendorName').select('-imageUrl');
        if (!singleProduct) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Single product fetched",
            singleProduct
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        console.log(error);
    }
}

//for displaying photo
export const imageProduct = async (req, res) => {
    try {
        // const productImage = await Product.findOne({Id: req.params.Id}).select('imageUrl');
        const productImage = await Product.findById(req.params.id);
        if (productImage.imageUrl.data) {
            // res.set("contentType",productImage.imageUrl.contentType);
            res.setHeader("Content-Type", "image/png")
            return res.status(200).send(productImage.imageUrl.data);
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        console.log(error);
    }
}

// for updating the product 
export const updateProduct = async (req, res) => {
    try {
        const { name, description, productPrice, category } = req.fields;
        const { vendorName } = req.fields;
        const { imageUrl } = req.files;
        switch (true) {
            case !name:
                return res.status(400).json({ success: false, message: "Name is required" });
            case !description:
                return res.status(400).json({ success: false, message: "Description is required for the product" });
            case !productPrice:
                return res.status(404).json({ success: false, message: "Price of the product is required" });
            case !category:
                return res.status(400).json({ success: false, message: "category cannot be empty" });
            case !vendorName:
                return res.status(400).json({ success: false, message: "Vendor name cannot be empty" });
            case imageUrl && imageUrl.size > 1000000:
                return res.status(404).
                    json({ success: false, message: "photo is required and should be less than 1 mb" });
        }

        const vendorId = await vendor.find({ email: vendorName });
        const vendId = vendorId._id;
        const { id } = req.params;
        const products = await Product.findByIdAndUpdate(id,
            { name, description, productPrice, category, vendId, slug: slugify(name) }, { new: true });
        if (imageUrl) {
            products.imageUrl.data = fs.readFileSync(imageUrl.path);
            products.imageUrl.contentType = imageUrl.type;
        }

        await products.save();
        res.status(200).json({
            success: true,
            message: "product updated successfully",
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        console.log(error);
    }
}

// for deleting the product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id).select("-imageUrl");
        res.status(200).json({
            success: true,
            message: "Product is deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        console.log(error);
    }
}