import express from 'express';
import ProductController from '../../controller/ProductController/ProductCon.js';
import auth from '../../common/auth.js';
const router =express.Router();
router.post('/productadd',ProductController.addProduct)
export default router;