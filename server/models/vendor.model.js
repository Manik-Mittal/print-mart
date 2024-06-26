import mongoose from "mongoose";


const querySchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true
    },
    status: {  // this is for giving options for preventing spelling mistakes by different users 
        type: String,
        enum: ["PENDING", "CANCELLED", "COMPLETED"],
        default: "PENDING"
    }
});

const vendorSchema = new mongoose.Schema({
    vendorName: {
        type: String, 
        required: [true,"Name is required for registering"],
        unique: true
    },
    email: {
        type: String,
        required:[true,"vendor is required to fill the ID"],
        unique: true
    },
    password: {
        type: String,
        minlength: [8,"password must be of 8 characters"],
        select: false
    },
    gstNo: {
        type: String,
        unique: true
    },
    queries: {
        type: [querySchema]
    },
    address: {
        type: String,
        required: [true,"Address is required"]
    },
    pincode: {
        type: Number,
        required: true
    },
    about: {
        type: String
    }
});

// this is the second way of exporting by not using default then when importing have to use same name
export const vendor = mongoose.model("vendor", vendorSchema);