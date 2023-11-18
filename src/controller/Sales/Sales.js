import salesModel from "../../model/Sales.js";
import productModel from "../../model/ProductModel.js";
const salesDataAdd=async(req,res)=>{
// console.log(req.body);
try {
   const salesData=await salesModel.findOne({$and:[
        {email:req.body.email},
        {productName:req.body.productName},{category:req.body.category}
    ]})

    console.log(salesData);
    const currentDate=new Date()
    // console.log(currentDate.getDate);
    if(salesData){
       const saleQty=Number(salesData.quantity)+Number(req.body.quantity);
       const salesPrice=Number(salesData.totalAmount)+Number(req.body.price);
       console.log(currentDate);
       salesData.quantity=saleQty
       salesData.totalAmount=salesPrice
       salesData.saleYear=`${currentDate.getFullYear()}`
       salesData.saleMon=`${currentDate.getMonth()}`
    //    console.log(salesData);
    res.status(200).send({message:'update sale data'});
    await salesData.save();
    }else{
        console.log('create');
      await  salesModel.create({
            email:req.body.email,
            productName:req.body.productName,
            category:req.body.category,
            quantity:req.body.quantity,
            totalAmount:req.body.price,
            saleYear:`${currentDate.getFullYear()}`,
            saleMon:`${currentDate.getMonth()}`

        })
        res.status(200).send({message:'create sale data'});

    }
} catch (error) {
    res.status(500).send({message:error.message})
}

}

const getSalesData=async(req,res)=>{

    try {
      const resData= await salesModel.find({email:req.params.email},{_id:0,saleMon:0,saleYear:0});
    //   console.log(resData.map((e)=>e));
    const productChart=resData.map((e)=>{return{
        productName:e.productName,
        quantity:e.quantity
    }})
    const obj={}

    /**
     * electrical:[
     * {},{}
     * ],
     * electronics:[
     * {},{}
     * ]
     * 
     */

    const categoryData=resData.reduce((acc,e)=>{
             acc[e.category]=acc[e.category]||  []
            acc[e.category].push({productName:e.productName,
                salesAmt:e.totalAmount})            
        //  console.log(acc);
        return acc
    },{}) 
console.log(categoryData);
    const category=resData.map((e)=>e.category);
console.log(category);
    const removeDup=category.filter((e,i)=>category.indexOf(e)==i)
    console.log(removeDup);
    const cateListAmt=removeDup.map((e)=>{
       return categoryData[e].map((c)=>Number(c.salesAmt))
       .reduce((prev,cur)=>{return parseInt(prev)+parseInt(cur)})
    })

    console.log(cateListAmt);
    
      res.status(200).send({message:'fetched sales data',productChart
      ,cateList:[{
        categoryname:category,
        totalAmt:cateListAmt
      }]})
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}

export default {salesDataAdd,getSalesData};