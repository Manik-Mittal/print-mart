import { Quotation } from "../models/quotation.model.js";
import User from "../models/user.model.js";
import { vendor } from "../models/vendor.model.js";
import fs from "fs";


export const createQuotation = async (req,res) => {
    try {
        const {customerName,productName,vendorName,quantity,message,paperQuality,colorType,lamination,city} = req.fields;
        const {pdf} = req.files;
        if(!customerName){
            return res.status(404).json({
                success:false,
                message: "Customer name cannot be empty"
            });
        }
        if(!productName){
            return res.status(404).json({success:false,message:"Product name cannot be empty"});
        }
        if(!vendorName){
            return res.status(404).json({success:false,message:"Vendor name cannot be empty"});
        }
        // creating the quotation
        const quotation = new Quotation({...req.fields});
        if(pdf){
            quotation.pdf.data = fs.readFileSync(pdf.path);
            quotation.pdf.contentType = pdf.type;
        }
        await quotation.save();

        // updating the user's order field
        const user = await User.findByIdAndUpdate(
            customerName,
            {$push: {orders: quotation._id}},
            {new : true}
        );

        // updating the vendor queries section
        const Vendor = await vendor.findByIdAndUpdate(
            vendorName,
            {$push: { queries: { orderID: quotation._id,status: "PENDING"}}},
            {new: true}
        );

        res.status(200).json({
            success:true,
            message:"Quotation created successfully and added to user account successfully",
            quotation
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        console.log(error);
    }
}

export const getQuotation = async (req,res) => {
    try {
        const foundQuotation = await Quotation.findById(req.params.id)
        .populate('customerName').populate('productName').populate('vendorName');
        if(!foundQuotation){
            res.status(404).json({success: false, message: "Quotation not found"});
        }
        res.status(200).json({
            success: true,
            message: "Quotation is found",
            foundQuotation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        console.log(error);
    }
}

export const getAllQuotation = async (req, res) => {
    try {
        const { email } = req.params;
        console.log('Email received in the backend:', email); // Add this line
        const vend = await vendor.findOne({ email: email });
        console.log('Vendor found:', vend); // Add this line
        const quotation = await Quotation.find({ vendorName: vend._id }).populate('customerName').populate('productName').populate('vendorName');
        console.log(quotation);
        res.status(200).json({
            success: true,
            message: "All the quotations are",
            quotation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        console.log("Error from the catch block: ", error);
    }
};

export const getAllQuotationCustomer = async (req,res) => {
    try {
        // const {Vendor} = req.session.auth;
        const {email} = req.params;
        const cust = await User.findOne({email: email});
        // console.log(vend);
        const quotation = await Quotation.find({customerName: cust._id}).populate('customerName').populate('productName').populate('vendorName');
        res.status(200).json({
            success: true,
            message: "All the quotation are",
            quotation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        console.log("Error from the catch block: ",error);
    }
}