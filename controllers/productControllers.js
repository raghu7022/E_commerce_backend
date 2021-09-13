import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 4
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        }
        : {}
    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

const getProductsById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('product not found')
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ message: 'Product Removed' })
    } else {
        res.status(404)
        throw new Error('product not found')
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStocks: 0,
        numReviews: 0,
        description: 'sample description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
    const {
        name, price, image, brand, category, countInStocks, numReviews, description
    } = req.body

    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.brand = brand
        product.image = image
        product.category = category
        product.countInStocks = countInStocks
        product.numReviews = numReviews

    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
})

const createProductReview = asyncHandler(async (req, res) => {
    const { ratings, comment } = req.body

    const product = await Product.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }
        const review = {
            name: req.user.name,
            ratings: Number(ratings),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.ratings =
            product.reviews.reduce((acc, item) => item.ratings + acc, 0) /
            product.reviews.length
        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ ratings: -1 }).limit(3)

    res.json(products)
})


export {
    getProducts, getProductsById, deleteProduct,
    createProduct, updateProduct, createProductReview, getTopProducts
}