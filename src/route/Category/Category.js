import express from'express';
import CategoryController from '../../controller/categoryCon/CategoryController.js';

const router =express.Router();
router.post('/savecategory',CategoryController.addCategory)
router.get('/view',CategoryController.getCategory)

export default router;