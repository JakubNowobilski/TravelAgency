const C = require("./constants.js")
const { MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const utils = require("./utils");

const client = new MongoClient(C.mongoConnectionString,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

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

async function dropUpdateDb() {
    try {
        const db = await client.db(C.mongoDbName)
        await db.dropDatabase();
        console.log('Dropped database:', C.mongoDbName);

        const trips = utils.readTripsFromFile()

        const result = await db.collection(C.tripsCollection).insertMany(trips);
        console.log('Inserted demo data:', result.insertedCount);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function connectDb() {
    try {
        await client.connect();
        console.log(`Connected successfully to ${C.mongoConnectionString}.`);

        const db = await client.db(C.mongoDbName)
        await db.command({ ping: 1 });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } catch (error) {
        console.error('Error:', error);
        await client.close();
    }
}

async function closeConnection() {
    await client.close();
    console.log('Connection closed');
}

process.on('SIGINT', function() {
    closeConnection().finally(process.exit(0));
})

module.exports = {
    connectDb: connectDb,
    closeConnection: closeConnection,
    dropUpdateDb: dropUpdateDb,
    getAllTrips: getAllTrips,
    getTripById: getTripById,
    addTrip: addTrip,
    deleteTrip: deleteTrip,
    addBooking: addBooking,
    subtractBooking: subtractBooking
}
