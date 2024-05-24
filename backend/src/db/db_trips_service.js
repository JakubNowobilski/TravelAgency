const C = require("../constants");
const client = require("./db_service").client
const {ObjectId} = require("mongodb");

async function getAllTrips() {
    try {
        const db = await client.db(C.mongoDbName)
        const trips = await db.collection(C.tripsCollection).find({}).toArray();
        console.log('Fetched all trips.');
        return trips
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getTripById(id) {
    try {
        const db = await client.db(C.mongoDbName)
        let trip = await db.collection(C.tripsCollection).findOne({_id: id})
        if (trip === null) {
            const objectId = new ObjectId(id)
            trip = await db.collection(C.tripsCollection).findOne({_id: objectId})
        }
        if (trip !== null) {
            console.log(`Fetched trip by id: ${id}`);
            return trip
        } else {
            console.log(`Could not find trip by id: ${id}`);
            return undefined
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function addTrip(trip) {
    try {
        const db = await client.db(C.mongoDbName)
        const result = await db.collection(C.tripsCollection).insertOne(trip)
        if (result.insertedId !== null) {
            console.log(`Added new trip of id: ${result.insertedId}`);
            return result
        } else {
            console.log(`Could not add new trip`);
            return undefined
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteTrip(id) {
    try {
        const db = await client.db(C.mongoDbName)
        let result = await db.collection(C.tripsCollection).deleteOne({_id: id})
        if (result.deletedCount === 0) {
            const objectId = new ObjectId(id)
            result = await db.collection(C.tripsCollection).deleteOne({_id: objectId})
        }
        if (result.deletedCount === 1) {
            console.log(`Deleted trip of id: ${id}`);
            return result
        } else {
            console.log(`Could not delete trip of id: ${id}`);
            return undefined
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function addBooking(id) {
    try {
        const db = await client.db(C.mongoDbName)
        let result = await db.collection(C.tripsCollection).updateOne({_id: id}, {$inc: {bookedPlaces: 1}})
        if (result.modifiedCount === 0) {
            const objectId = new ObjectId(id)
            result = await db.collection(C.tripsCollection).updateOne({_id: objectId}, {$inc: {bookedPlaces: 1}})
        }
        if (result.modifiedCount === 1) {
            console.log(`Added booking to trip of id: ${id}`);
            return result
        } else {
            console.log(`Could not subtract booking to trip of id: ${id}`);
            return undefined
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function subtractBooking(id) {
    try {
        const db = await client.db(C.mongoDbName)
        let result = await db.collection(C.tripsCollection).updateOne({_id: id}, {$inc: {bookedPlaces: -1}})
        if (result.modifiedCount === 0) {
            const objectId = new ObjectId(id)
            result = await db.collection(C.tripsCollection).updateOne({_id: objectId}, {$inc: {bookedPlaces: -1}})
        }
        if (result.modifiedCount === 1) {
            console.log(`Subtracted booking to trip of id: ${id}`);
            return result
        } else {
            console.log(`Could not subtract booking to trip of id: ${id}`);
            return undefined
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {
    getAllTrips: getAllTrips,
    getTripById: getTripById,
    addTrip: addTrip,
    deleteTrip: deleteTrip,
    addBooking: addBooking,
    subtractBooking: subtractBooking
}
