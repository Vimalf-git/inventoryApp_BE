import salesModel from "../../model/Sales.js";
import productModel from "../../model/ProductModel.js";
const salesDataAdd = async (req, res) => {
    console.log(req.body);
    try {
        const salesData = await salesModel.findOne({
            $and: [
                { email: req.body.email },
                { productName: req.body.productName }, { category: req.body.category }
            ]
        })
        const prodQtyReduce = await productModel.findOne({ _id: req.body.id });
        console.log(prodQtyReduce);
        const currentDate = new Date()
        const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
            "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const salesmon = monthNames[currentDate.getMonth()];
        console.log(salesmon);
        if (salesData) {
            const saleQty = Number(salesData.quantity) + Number(req.body.quantity);
            const salesPrice = Number(salesData.totalAmount) + Number(req.body.price);
            salesData.quantity = saleQty
            salesData.totalAmount = salesPrice
            salesData.saleYear = `${currentDate.getFullYear()}`
            salesData.saleMon = monthNames[currentDate.getMonth()]
            prodQtyReduce.quantity = parseInt(prodQtyReduce.quantity) - parseInt(req.body.quantity)
            // console.log(qtySub);
            await salesData.save();
            await prodQtyReduce.save()
            res.status(200).send({ message: 'update sale data' });

        } else {
            await salesModel.create({
                email: req.body.email,
                productName: req.body.productName,
                category: req.body.category,
                quantity: req.body.quantity,    
                totalAmount: req.body.price,
                saleYear: `${currentDate.getFullYear()}`,
                saleMon: monthNames[currentDate.getMonth()]
            })
            prodQtyReduce.quantity = parseInt(prodQtyReduce.quantity) - parseInt(req.body.quantity);

            // console.log(qtySub);
            await prodQtyReduce.save()
            res.status(200).send({ message: 'create sale data' });

        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

}

const getSalesData = async (req, res) => {

    try {
        const resData = await salesModel.find({ email: req.params.email }, { _id: 0, saleYear: 0 });
        const productChart = resData.map((e) => {
            return {
                productName: e.productName,
                quantity: e.quantity
            }
        })
        const categoryData = resData.reduce((acc, e) => {
            acc[e.category] = acc[e.category] || []
            acc[e.category].push({
                productName: e.productName,
                quantity: e.quantity
            })
            //  console.log(acc);
            return acc
        }, {})
        // console.log(categoryData);
        const category = resData.map((e) => e.category);
        // console.log(category);
        const removeDup = category.filter((e, i) => category.indexOf(e) == i)
        // console.log(removeDup);

        const cateListAmt = removeDup.map((e) => {
            return categoryData[e].map((c) => Number(c.quantity))
                .reduce((prev, cur) => { return prev + parseInt(cur) }, 0)
        })
        // const obj=
        let categotyList = []


        // for(var y = 0; y < removeDup.length; y++){
        for (var i = 0; i < removeDup.length; i++) {
            let thing = {};
            thing['category'] = category[i];
            thing['quantity'] = cateListAmt[i];
            categotyList.push(thing)

        }
        // console.log(resData);

        const getmon = resData.map((e) => e.saleMon);
        // console.log(category);
        const removeMonDup = getmon.filter((e, i) => getmon.indexOf(e) == i)
        // console.log(removeMonDup);
        const getMonData = resData.reduce((acc, e) => {
            // console.log(e.saleMon);
            acc[e.saleMon] = acc[e.saleMon] || []
            acc[e.saleMon].push({
                quantity: e.quantity,
                category: e.category
            }
            )
            return acc
            // .reduce((pre,e)=>{
            //     pre[e.category]=pre[e.category]||[]
            //     pre[e.category].push({
            //         quantity:e.quantity,
            //     category:e.category
            //     })
            // },[])

        }, [])
        // removeDup
        // const yeardata=getMon.map((e)=>{


        // })
        // const cateListAmt = removeDup.map((e) => {
        //     return categoryData[e].map((c) => Number(c.quantity))
        //         .reduce((prev, cur) => { return parseInt(prev) + parseInt(cur) })
        // })
        const Mondata = removeMonDup.map((a) => {
            return getMonData[a].map((c) => Number(c.quantity))
                .reduce((prev, cur) => { return prev + parseInt(cur) }, 0)
        })
        let monDataList = []
        for (var i = 0; i < removeMonDup.length; i++) {
            let thing = {};
            thing['mon'] = removeMonDup[i];
            thing['quantity'] = Mondata[i];
            monDataList.push(thing)

        }
        // console.log(monDataList);
        // console.log(yeardata);
        // console.log(getMonData['oct']);

        res.status(200).send({
            message: 'fetched sales data', productChart
            , categotyList, monDataList
        })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

export default { salesDataAdd, getSalesData };