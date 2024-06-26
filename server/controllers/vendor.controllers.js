import { vendor } from "../models/vendor.model.js"; // vendor in {} because not exported in default
import { Category } from "../models/category.model.js";
import slugify from "slugify";

export const createVendor = async (req,res) => {
    try {
        const {vendorName, email, password,gstNo,address,pincode,about} = req.body;

        if(!vendorName || !email || !password) {
            return res.status(400).json({success: false, message: "Fill the required fields"});
        }

        if(!pincode){
            return res.status(404).json({success:false,message:"Enter the pincode it is required"});
        }

        let Vendor = await vendor.findOne({vendorName, email});
        if(Vendor) {
            return res.status(400).json({success: false, message: "vendor already exist"});
        }

        Vendor = await vendor.create({
            vendorName,
            email,
            password,
            gstNo,
            address,
            pincode,
            about
        });

        res.status(200).json({success: true, message: "ok vendor registered",vendor});
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get vendor for displaying in about vendor
export const getVendor = async (req,res) => {
    try {
        const {id} = req.params;
        const fetchedVendor = await vendor.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Fetched Vendor is: ",
            fetchedVendor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        console.log(error);
    }
}
// controllers for category
// controller for creating a new category
export const createCategory = async (req,res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(404).json({success:false,message:"Name of category is required"});
        }
        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.status(404).json({success:false,message:"This category already exists !!"});
        }
        const category = await new Category({name,slug:slugify(name)}).save();
        res.status(200).json({
            success:true,
            message: "new category added",
            category
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// controller for updating the cateogory
export const updateCategory = async (req,res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).json({
            success:true,
            message:"Category is updated successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

// controller for getting all the categories
export const getAllCategories  = async (req,res) => {
    try {
        const allCategories = await Category.find({});
        res.status(200).json({
            success: true,
            message: "all the categories are",
            allCategories
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

// controller for getting single category
export const singleCategory = async (req,res) => {
    try {
        const single = await Category.find({slug:req.params.slug});
        res.status(200).json({
            success:true,
            message:"Single category fetched successfully",
            single
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// controller for deleting category
export const deletingCategory = async (req,res) => {
    try {
        const {id} = req.params;
        await Category.findByIdAndDelete({id});
        res.status(200).json({
            success:true,
            message:"Category is deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}