const C = require("../constants");
const client = require("./db_service").client
const {ObjectId} = require("mongodb");

async function getAllProducts() {
    try {
        const db = await client.db(C.mongoDbName)
        const products = await db.collection(C.productsCollection).find({}).toArray();
        console.log('Fetched all products.');
        return products
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getProductById(id) {
    try {
        const db = await client.db(C.mongoDbName)
        let product = await db.collection(C.productsCollection).findOne({_id: id})
        if (product === null) {
            const objectId = new ObjectId(id)
            product = await db.collection(C.productsCollection).findOne({_id: objectId})
        }
        if (product !== null) {
            console.log(`Fetched product by id: ${id}`);
            return product
        } else {
            console.log(`Could not find product by id: ${id}`);
            return undefined
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function addProduct(product) {
    try {
        const db = await client.db(C.mongoDbName)
        const result = await db.collection(C.productsCollection).insertOne(product)
        if (result.insertedId !== null) {
            console.log(`Added new product of id: ${result.insertedId}`);
            return result
        } else {
            console.log(`Could not add new product`);
            return undefined
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteProduct(id) {
    try {
        const db = await client.db(C.mongoDbName)
        let result = await db.collection(C.productsCollection).deleteOne({_id: id})
        if (result.deletedCount === 0) {
            const objectId = new ObjectId(id)
            result = await db.collection(C.productsCollection).deleteOne({_id: objectId})
        }
        if (result.deletedCount === 1) {
            console.log(`Deleted product of id: ${id}`);
            return result
        } else {
            console.log(`Could not delete product of id: ${id}`);
            return undefined
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function addBooking(id) {
    try {
        const db = await client.db(C.mongoDbName)
        let result = await db.collection(C.productsCollection).updateOne({_id: id}, {$inc: {quantity: 1}})
        if (result.modifiedCount === 0) {
            const objectId = new ObjectId(id)
            result = await db.collection(C.productsCollection).updateOne({_id: objectId}, {$inc: {quantity: 1}})
        }
        if (result.modifiedCount === 1) {
            console.log(`Added booking to product of id: ${id}`);
            return result
        } else {
            console.log(`Could not subtract booking to product of id: ${id}`);
            return undefined
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function subtractBooking(id) {
    try {
        const db = await client.db(C.mongoDbName)
        let result = await db.collection(C.productsCollection).updateOne({_id: id}, {$inc: {quantity: -1}})
        if (result.modifiedCount === 0) {
            const objectId = new ObjectId(id)
            result = await db.collection(C.productsCollection).updateOne({_id: objectId}, {$inc: {quantity: -1}})
        }
        if (result.modifiedCount === 1) {
            console.log(`Subtracted booking to product of id: ${id}`);
            return result
        } else {
            console.log(`Could not subtract booking to product of id: ${id}`);
            return undefined
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {
    getAllProducts: getAllProducts,
    getProductById: getProductById,
    addProduct: addProduct,
    deleteProduct: deleteProduct,
    addBooking: addBooking,
    subtractBooking: subtractBooking
}
