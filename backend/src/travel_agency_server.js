const db = require("./db_service")
const express = require("express");
const cors = require("cors");
const port = 8080;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/trips", ((req, res) => {
    printReqSummary(req)
    db.getAllTrips().then((trips) => {
        return res.status(200).send(trips)
    })
}))

app.get("/trips/:id", ((req, res) => {
    printReqSummary(req)
    db.getTripById(parseInt(req.params.id)).then((trip) => {
        if (trip !== undefined) {
            return res.status(200).send(trip)
        } else {
            return res.status(404).send({error: 'Data not found'})
        }
    })
}))

app.get("/*", ((req, res) => {
    printReqSummary(req)
    res.status(200).send({hello_world: "OK"});
}))

app.listen(port, () => {
    db.connectDb().then(() => {
        console.log("App server listening at http://localhost:" + port);
    })
})

function printReqSummary(req) {
    console.log("Handling " + req.method + " " + decodeURI(req.originalUrl));
}
