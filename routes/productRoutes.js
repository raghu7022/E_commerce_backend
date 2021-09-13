import express from 'express'
const router = express.Router()
import { getProductsById, getProducts, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts } from '../controllers/productControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)
router.get('/top', getTopProducts)
router.route('/:id')
    .get(getProductsById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)


export default router