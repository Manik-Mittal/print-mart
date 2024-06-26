import mongoose from "mongoose";

const quotatonSchema = new mongoose.Schema({
    customerName: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, "giving the customer is required (error from model of quotation)"]
    },
    productName: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },
    vendorName: {
        type: mongoose.Schema.ObjectId,
        ref: 'vendor'
    },
    quantity: {
        type: Number
    },
    message: {
        type: String
    },
    paperQuality: {
        type: Number,
    },
    colorType: {
        type: String
    },
    lamination: {
        type: Boolean
    },
    city: {
        type: String
    },
    pdf: {
        data: Buffer,
        contentType: String
    }
    
},{timestamps: true});

export const Quotation = mongoose.model("Quotation",quotatonSchema);