const fs = require("fs");

function readDemoDataFromFile() {
    const demo_data = fs.readFileSync('demo-data.json', 'utf8')
    return JSON.parse(demo_data)
}

function validateTrip(trip) {
    const requiredAttributes = ["bookedPlaces", "country", "dateEnd", "dateStart", "description", "imgURL",
        "maxPlaces", "name", "price"]
    const tripAttributes = Object.keys(trip)
    if (tripAttributes.every(e => requiredAttributes.includes(e)) &&
        requiredAttributes.every(e => tripAttributes.includes(e))) {
        const integerFields = [trip.bookedPlaces, trip.maxPlaces, trip.price]
        if (integerFields.every(e => Number.isInteger(e))){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function validateProduct(product) {
    const requiredAttributes = ["quantity", "tripId"]
    const productAttributes = Object.keys(product)
    if (productAttributes.every(e => requiredAttributes.includes(e)) &&
        requiredAttributes.every(e => productAttributes.includes(e))) {
        if (Number.isInteger(product.quantity)){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function validateUser(user) {
    const requiredAttributes = ["email", "role"]
    const userAttributes = Object.keys(user)
    if (userAttributes.every(e => requiredAttributes.includes(e)) &&
        requiredAttributes.every(e => userAttributes.includes(e))) {
        return true;
    } else {
        return false;
    }
}

function printReqSummary(req) {
    console.log("Handling " + req.method + " " + decodeURI(req.originalUrl));
}

module.exports = {
    readDemoDataFromFile: readDemoDataFromFile,
    validateTrip: validateTrip,
    validateProduct: validateProduct,
    validateUser: validateUser,
    printReqSummary: printReqSummary
}
