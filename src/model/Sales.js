import mongoose from "./index.js";

const SalesSchema=new mongoose.Schema({
    email:{type:String,require:[true,"please enter your mail"]},
    productName:{type:String,require:[true,"please enter your mail"]},
    category:{type:String,require:[true,"please enter your category"]},
    quantity:{type:String,require:[true,"please enter your qty"]},
    totalAmount:{type:String,require:[true,"please enter your price"]},
    saleYear:{type:String,require:true},
    saleMon:{type:String,require:true},
}
,{
    versionKey:false
})

const salesModel=mongoose.model('sales',SalesSchema)

export default salesModel;