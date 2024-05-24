const C = require("../constants");
const client = require("./db_service").client
const {ObjectId} = require("mongodb");

async function getAllUsers() {
    try {
        const db = await client.db(C.mongoDbName)
        const users = await db.collection(C.usersCollection).find({}).toArray();
        console.log('Fetched all users.');
        return users
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getUserById(id) {
    try {
        const db = await client.db(C.mongoDbName)
        let user = await db.collection(C.usersCollection).findOne({_id: id})
        if (user === null) {
            const objectId = new ObjectId(id)
            user = await db.collection(C.usersCollection).findOne({_id: objectId})
        }
        if (user !== null) {
            console.log(`Fetched user by id: ${id}`);
            return user
        } else {
            console.log(`Could not find user by id: ${id}`);
            return undefined
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function addUser(user) {
    try {
        const db = await client.db(C.mongoDbName)
        const result = await db.collection(C.usersCollection).insertOne(user)
        if (result.insertedId !== null) {
            console.log(`Added new user of id: ${result.insertedId}`);
            return result
        } else {
            console.log(`Could not add new user`);
            return undefined
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteUser(id) {
    try {
        const db = await client.db(C.mongoDbName)
        let result = await db.collection(C.usersCollection).deleteOne({_id: id})
        if (result.deletedCount === 0) {
            const objectId = new ObjectId(id)
            result = await db.collection(C.usersCollection).deleteOne({_id: objectId})
        }
        if (result.deletedCount === 1) {
            console.log(`Deleted user of id: ${id}`);
            return result
        } else {
            console.log(`Could not delete user of id: ${id}`);
            return undefined
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    addUser: addUser,
    deleteUser: deleteUser,
}
