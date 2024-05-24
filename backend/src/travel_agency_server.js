const db = require("./db/db_service")
const utils = require("./utils");
const tripsController = require("./controller/trips_controller");
const usersController = require("./controller/users_controller");
const express = require("express");
const cors = require("cors");
const port = 8080;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

tripsController.tripsController(app)
usersController.usersController(app)

app.get("/*", ((req, res) => {
    utils.printReqSummary(req)
    res.status(200).send({hello_world: "OK"});
}))

app.listen(port, () => {
    db.connectDb().then(() => {
        console.log("App server listening at http://localhost:" + port);
    })
})

