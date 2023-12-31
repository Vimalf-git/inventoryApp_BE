import express from 'express';
import login from './UserRouter/User.js'
import product from './Product/product.js'
import category from './Category/Category.js'
import DashBoard from'./DashBoard/DashBoard.js'
import Sales from './Sales/Sales.js'
import Forget from './Forget/Forget.js'
const route=express();
route.use('/',login);
route.use('/',product);
route.use('/category',category)
route.use('/',DashBoard)
route.use('/',Sales)
route.use('/forgetpass',Forget)
export default route;