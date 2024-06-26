import mongoose from "mongoose";
import slugify  from "slugify";

const productSchema = new mongoose.Schema({
    Id: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
        requierd: true
    },
    vendorName:{
        type:mongoose.ObjectId,
        ref:'vendor'
    },
    imageUrl: {
        data: Buffer,
        contentType: String
    }
},{timestamps:true});

productSchema.pre('save', async function(next) {
    try {
        // Create a slug from the product name
        const slug = slugify(this.name, { lower: true });

        // Query for existing documents with the same slug
        const existingProducts = await this.constructor.find({ Id: { $regex: '^' + slug } });

        // Count the number of existing products with the same slug
        const count = existingProducts.length;

        // Generate the custom id
        this.Id = `${slug}${String(count + 1).padStart(3, '0')}`;
        next();
    } catch (error) {
        console.error('Error in pre-save hook:', error);
        next(error); // Pass error to continue save operation
    }
});

export const Product = mongoose.model("Product",productSchema);