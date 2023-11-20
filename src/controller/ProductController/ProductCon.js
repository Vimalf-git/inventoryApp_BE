import productModel from "../../model/ProductModel.js"

const addProduct = async (req, res) => {
    try {
        console.log(req.body);
        const data = await productModel.findOne({
            $and: [
                { email: req.body.email }, { productName: req.body.productName }
            ]
        })
        // console.log(data);
        if (data) {
            data.price = req.body.price;
            data.quantity = req.body.quantity;
            await data.save()
            res.status(200).send({ message: 'successfully Update' })
        } else {
            await productModel.create(req.body);
            res.status(200).send({ message: 'successfully added' })
        }

    } catch (error) {
        res.status(500).send({ message: error.message })

    }
}
const updateProductById=async(req,res)=>{
    try {
        console.log(req.body);
        console.log('enter into update');
        const data=await productModel.findOne({_id:req.body.id});
        if(data){
            data.ProductCode=req.body.productCode
            data.price=req.body.price
            data.quantity=req.body.quantity
           const res1= await data.save()
           console.log(res1);
            res.status(200).send({message:'update successfully'})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
}
const getProductById=async(req,res)=>{
    try {
        console.log('enter into one pro'+req.params.id);
       const data= await productModel.findOne({_id:req.params.id})
       if(data){
        res.status(200).send({message:'fetched successfully',data})
       }
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}
const getProduct = async (req, res) => {
    try {
        const data = await productModel.find({email:req.params.email}, { email: 0 });
        if (data) {
            const resData=data.map((e,i)=>{
                // console.log(e._id);
                return {
                    id:e._id,
                    checkboxId:i,
                    productName:e.productName,
                    category:e.category,
                    price:e.price,
                    quantity:e.quantity,
                    ProductCode:e.ProductCode
                }
            })
            // console.log("ji");
            // console.log(resData);
            res.status(200).send({ message: "successfully fetched", data: resData });
        } else {
            res.status(200).send({ message: "No Data Found" })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const deleteProduct=async(req,res)=>{
try {
    console.log(req.params.id);
 const data=   await productModel.findOneAndDelete({_id:req.params.id})
    // console.log(data);
    res.status(200).send({message:"delete successfully"})
} catch (error) {
    res.status(500).send({message:error.message})

}
}
export default { addProduct,getProduct,deleteProduct,updateProductById ,getProductById}