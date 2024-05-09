const C = require("./constants.js")
const { MongoClient, ServerApiVersion } = require("mongodb");
const fu = require("./file_utils");

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

        const trips = fu.readTripsFromFile()

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
    dropUpdateDb: dropUpdateDb
}
