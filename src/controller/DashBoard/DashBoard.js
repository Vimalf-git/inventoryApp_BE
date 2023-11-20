import productModel from "../../model/ProductModel.js";

const cardvalue = async (req, res) => {
    try {
        // console.log(req.params.email);
        const card = await productModel.find({ email: req.params.email }, { productName: 1, category: 1, quantity: 1, price: 1, _id: 0 })
        // console.log(card);
        const products = card.map((e) => e.productName)
        const allCategories = card.map((e) => e.category);
        const final = allCategories.filter((e, i) => allCategories.indexOf(e) == i)
        const outOfStock = card.map((e) => e.quantity == 0 ? e.productName : null).filter((e) => e != null)
        const storevalue = card.map((e) => e.price).reduce((prev, e) => prev + parseInt(e),0)
        // console.log(outOfStock);
        if (card) {

            res.status(200).send({
                message: "data fetched",
                products, allCategories: final,
                outOfStock, storevalue

            })
        } else {
            res.status(400).send({ message: "no exist data" })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

export default { cardvalue }