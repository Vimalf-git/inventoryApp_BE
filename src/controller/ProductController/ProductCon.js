import productModel from "../../model/ProductModel.js"

const addProduct=async(req,res)=>{
try {
    const data= await productModel.findOne({$and:[
        {email:req.body.email},{productName:req.body.productName}
    ]})
    console.log(data);
    if(data){
        data.price=req.body.price;
        data.quantity=req.body.quantity;
      await  data.save()
      res.status(200).send({message:'successfully Update'})    
    }else{
        await  productModel.create(req.body);
        res.status(200).send({message:'successfully added'})    
    }
 
} catch (error) {
    res.status(500).send({message:error.message})

}
}

export default {addProduct}