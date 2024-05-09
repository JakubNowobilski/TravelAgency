const C = require("./constants.js")
const db = require("./db_service")

async function run() {
    await db.connectDb()
    await db.dropUpdateDb()
    await db.closeConnection()
}
run().catch(console.dir);
