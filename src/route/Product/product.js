import express from 'express';
import ProductController from '../../controller/ProductController/ProductCon.js';
import auth from '../../common/auth.js';
const router =express.Router();
router.post('/productadd',ProductController.addProduct)
router.get('/getproduct/:email',ProductController.getProduct);
router.delete('/deleteproduct',ProductController.deleteProduct)
export default router;