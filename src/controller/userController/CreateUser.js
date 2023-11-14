import auth from "../../common/auth.js"
import userModel from "../../model/UserDetails.js"

const create=async(req,res)=>{
    console.log("enter into create");
    try {
        let data=await userModel.findOne({email:req.body.email})
        if(!data){
            req.body.password=await auth.hashPassword(req.body.password)
            await userModel.create(req.body)
            res.status(201).send({message:'successfully data store'})    
        }else{
            res.status(400).send({message:'user exist'})
        }
    } catch (error) {
        res.status(500).send({message:'failed store data',error:error.message})    
    }
    
}

export default {create}