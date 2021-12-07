import asyncHandler from 'express-async-handler'
import Bundle from '../models/bundleModel.js'


const getBundleById = asyncHandler(async (req, res) => {
    const bundles = await Bundle.findById(req.params.id)

    res.json(bundles)
})

const getBundle = asyncHandler(async (req, res) => {
    const bundles = await Bundle.find({})

    res.json(bundles)
})

const createBundle = asyncHandler(async (req, res) => {
    const data = new Bundle({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        products: req.body.products

    })
    const createdData = await data.save()
    res.send(createdData)
})




export { getBundleById, getBundle, createBundle }