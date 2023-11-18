import productModel from "../../model/ProductModel.js"

const addProduct = async (req, res) => {
    try {
        const data = await productModel.findOne({
            $and: [
                { email: req.body.email }, { productName: req.body.productName }
            ]
        })
        console.log(data);
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
const getProduct = async (req, res) => {
    try {
        const data = await productModel.find({email:req.params.email}, { _id: 0, email: 0 });
        if (data) {
            const resData=data.map((e,i)=>{
                return {
                    id:e.id,
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
 const data=   await productModel.findOneAndDelete({
        $and: [
            { email: req.body.email }, 
            { productName: req.body.productName },
            {category:req.body.category}
        ]
    })
    console.log(data);
    res.status(200).send({message:"delete successfully"})
} catch (error) {
    res.status(500).send({message:error.message})

}
}
export default { addProduct,getProduct,deleteProduct }