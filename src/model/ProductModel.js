import mongoose from "./index.js"
const productSchema=new mongoose.Schema({
    email:{type:String,require:[true,"product is required"]},
    productName:{type:String,require:[true,"product is required"]},
    category:{type:String,require:[true,"category is required"]},
    price:{type:String,require:[true,'price required']},
    quantity:{type:String,require:[true,'quantity required']},
    ProductCode:{type:String,require:[true,'code required']},
    value:{type:String},

},{
    versionKey:false
})

const productModel=mongoose.model('productData',productSchema);
export default productModel;
