import express from 'express';
import ProductController from '../../controller/ProductController/ProductCon.js';
import auth from '../../common/auth.js';
const router =express.Router();
router.post('/productadd',auth.validate,ProductController.addProduct)
router.get('/getproduct/:email',auth.validate,ProductController.getProduct);
router.delete('/deleteproduct/:id',auth.validate,ProductController.deleteProduct)
router.put('/updateproduct',auth.validate,ProductController.updateProductById)
router.get('/getproductbyid/:id',auth.validate,ProductController.getProductById)
export default router;