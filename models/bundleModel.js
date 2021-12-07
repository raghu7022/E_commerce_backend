import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productId: { type: String, required: true },
}, {
    timestamps: true
})

const bundleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products:
        [productSchema],
    image: {
        type: String,
        //required: true,
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
}, {
    timestamps: true
})


const Bundle = mongoose.model('Bundle', bundleSchema)

export default Bundle
