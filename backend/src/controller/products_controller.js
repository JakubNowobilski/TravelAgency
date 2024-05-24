const db_products = require("../db/db_products_service");
const utils = require("../utils");

function productsController(app) {
    app.get("/products/add_booking/:id", ((req, res) => {
        utils.printReqSummary(req)
        db_products.addBooking(req.params.id).then((result) => {
            if (result !== undefined) {
                return res.status(200).send(result)
            } else {
                return res.status(404).send({error: 'Data not found'})
            }
        })
    }))

    app.get("/products/subtract_booking/:id", ((req, res) => {
        utils.printReqSummary(req)
        db_products.subtractBooking(req.params.id).then((result) => {
            if (result !== undefined) {
                return res.status(200).send(result)
            } else {
                return res.status(404).send({error: 'Data not found'})
            }
        })
    }))

    app.delete("/products/:id", ((req, res) => {
        utils.printReqSummary(req)
        db_products.deleteProduct(req.params.id).then((result) => {
            if (result !== undefined) {
                return res.status(200).send(result)
            } else {
                return res.status(404).send({error: 'Data not found'})
            }
        })
    }))

    app.post("/products", ((req, res) => {
        utils.printReqSummary(req)
        const product = req.body
        if (utils.validateProduct(product)) {
            db_products.addProduct(product).then(result => {
                return res.status(200).send(result)
            })
        } else {
            return res.status(404).send({error: 'Invalid product data'})
        }
    }))

    app.get("/products", ((req, res) => {
        utils.printReqSummary(req)
        db_products.getAllProducts().then((product) => {
            return res.status(200).send(product)
        })
    }))

    app.get("/products/:id", ((req, res) => {
        utils.printReqSummary(req)
        db_products.getProductById(req.params.id).then((product) => {
            if (product !== undefined) {
                return res.status(200).send(product)
            } else {
                return res.status(404).send({error: 'Data not found'})
            }
        })
    }))
}

module.exports = {
    productsController: productsController
}
