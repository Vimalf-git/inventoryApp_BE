import express from'express';
import CategoryController from '../../controller/categoryCon/CategoryController.js';
import auth from '../../common/auth.js';

const router =express.Router();
router.post('/savecategory',auth.validate,CategoryController.addCategory)
router.get('/view',auth.validate,CategoryController.getCategory)

export default router;