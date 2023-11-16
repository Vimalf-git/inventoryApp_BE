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
        const data = await productModel.find({}, { _id: 0, email: 0 });
        if (data) {
            res.status(200).send({ message: "successfully fetched", data });
        } else {
            res.status(200).send({ message: "No Data Found" })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

export default { addProduct,getProduct }