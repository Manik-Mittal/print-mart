import mongoose from "mongoose";

// this is a mini schema which is not for exporting this is just made to use inside the main schema
const productOrderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,  // this is a way of referencing from other schema
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    }
});

// const paymentModeSchema = new mongoose.Schema({
//     creditCard: {
//         creditNo: Number,
//         nameOnCard: String,
//         expiryDate: Date,
//     },
//     debitCard: {
//         debitNo: Number,
//         nameOnCard: String,
//         expiryDate: Date,
//     },
//     upiId: {
//         type : String,
//     }
// });

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: [6,"password must be of atleast 6 characters"],
        select: false
    }, // this is the professional way of writing the properties of the attribute
    contactNo: Number,
    address : {
        type: String,
        required: true
    },
    orders:{
        type:[productOrderSchema]
    },  // this is a array of products
    // payment: {
    //     type : paymentModeSchema
    // }
});

// this the default way in this when importing in the new file we can import it by giving any name but 
// if we do not do that then we have to import it as it is
export default mongoose.model("user",userSchema); //it is the ES6 module way of writing both are doing the same thing

// in mongodb every schema's name becomes plural by adding s and every character in lowercase it is 
// the syntax of mongodb

// we can only use one way at a time for this project I have used commonJS way