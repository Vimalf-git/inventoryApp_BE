import express from 'express';
import salesController from '../../controller/Sales/Sales.js';
const route=express.Router();
route.post('/saleslistadd',salesController.salesDataAdd)
route.get('/getsalelist/:email',salesController.getSalesData)
export default route;