
import mongoose from "./index.js";

const userSchema=new mongoose.Schema({
    username:{type:String,require:[true,'username is required']},
    email:{type:String,require:[true,'email is requires']},
    password:{type:String,require:[true,'should be enter password']},
    contact:{type:String,require:[true,'please fill contact']},
    token:{type:String},
},{
    versionKey:false
})

const userModel=mongoose.model('userData',userSchema)

export default userModel
