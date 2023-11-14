import express from 'express';
import DashBoardController from '../../controller/DashBoard/DashBoard.js';
const router =express.Router();

router.get("/cardlist/:email",DashBoardController.cardvalue)
export default router