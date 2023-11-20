import express from 'express';
import DashBoardController from '../../controller/DashBoard/DashBoard.js';
import auth from '../../common/auth.js';
const router =express.Router();

router.get("/cardlist/:email",auth.validate,DashBoardController.cardvalue)
export default router