import express from 'express';
import login from './UserRouter/User.js'
import product from './Product/product.js'
import category from './Category/Category.js'
import DashBoard from'./DashBoard/DashBoard.js'
const route=express();
route.use('/',login);
route.use('/',product);
route.use('/category',category)
route.use('/',DashBoard)
export default route;