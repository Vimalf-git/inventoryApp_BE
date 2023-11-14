import mongoose from "./index.js";


const categoryList=new mongoose.Schema({
    category:[{type:String,require:true}]
},{
    versionKey:false
})

const categoryModel=mongoose.model('category',categoryList);

export default categoryModel;