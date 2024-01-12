import express from 'express';
import salesController from '../../controller/Sales/Sales.js';
import auth from '../../common/auth.js';
const route=express.Router();
route.post('/saleslistadd',auth.validate,salesController.salesDataAdd)
route.get('/getsalelist/:email',salesController.getSalesData)
export default route;