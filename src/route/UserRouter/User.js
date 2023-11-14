import express from 'express';
import Logincontroller from '../../controller/userController/Login.js';
import UserData from '../../controller/userController/CreateUser.js';
const router=express.Router();
router.post('/login',Logincontroller.login);
router.post('/usercreate',UserData.create);

export default router;