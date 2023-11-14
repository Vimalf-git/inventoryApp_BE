import categoryModel from "../../model/Category.js"
const addCategory=async(req,res)=>{
    
    try {
        // console.log(req.body);
      await  categoryModel.create(req.body);
        res.status(200).send({message:'successfully added'})    
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}

const getCategory=async(req,res)=>{
try {
    const categoryList=await categoryModel.find({},{_id:0});
    const category=categoryList[0].category
    console.log(categoryList);
    res.status(200).send(
        {category}
    )
} catch (error) {
    res.status(500).send({message:error.message})
}
}
export default {addCategory,getCategory}