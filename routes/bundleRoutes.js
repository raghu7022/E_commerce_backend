import express from 'express'
import { createBundle, getBundle, getBundleById } from '../controllers/bundleControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/:id', getBundleById, protect)
router.get('/', getBundle, protect)
router.post('/', createBundle, protect, admin)


export default router