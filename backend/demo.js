const { MongoClient } = require('mongodb');

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const dbName = 'your_database_name'; // Replace with your database name

// Demo data to insert
const demoData = [
    { name: 'Product 1', price: 10 },
    { name: 'Product 2', price: 20 },
    { name: 'Product 3', price: 30 }
];

async function main() {
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        // Access the database
        const db = client.db(dbName);

        // Drop the database
        await db.dropDatabase();
        console.log('Dropped database:', dbName);

        // Insert demo data
        const result = await db.collection('products').insertMany(demoData);
        console.log('Inserted demo data:', result.insertedCount);

        // Show real results
        const realResult = await db.collection('products').find({}).toArray()
        console.log('Real results:', realResult);

        // Close the connection
        await client.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
