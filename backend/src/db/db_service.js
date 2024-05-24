const C = require("../constants.js")
const { MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const utils = require("../utils");

const client = new MongoClient(C.mongoConnectionString,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

async function dropUpdateDb() {
    try {
        const db = await client.db(C.mongoDbName)
        await db.dropDatabase();
        console.log('Dropped database:', C.mongoDbName);

        const demoData = utils.readDemoDataFromFile()

        await insertIntoCollection(db, C.tripsCollection, demoData.trips)
        await insertIntoCollection(db, C.usersCollection, demoData.users)

    } catch (error) {
        console.error('Error:', error);
    }
}

async function insertIntoCollection(db, collectionName, collection) {
    const result = await db.collection(collectionName).insertMany(collection);
    console.log(`Inserted demo data ${result.insertedCount} elements into collection: ${collectionName}`);
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
    client: client
}
