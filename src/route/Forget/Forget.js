import express from 'express'
import forget from '../../controller/Forget/Forget.js'
const rounter =express.Router();
rounter.post('/',forget.forgetPassword)
rounter.get('/getres/:id/:token',forget.getForgetres)
rounter.post('/updatepassword',forget.updatePassword)

export default rounter;