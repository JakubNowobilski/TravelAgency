const db_trips = require("../db/db_trips_service");
const utils = require("../utils");

function tripsController(app) {
    app.get("/trips/add_booking/:id", ((req, res) => {
        utils.printReqSummary(req)
        db_trips.addBooking(req.params.id).then((result) => {
            if (result !== undefined) {
                return res.status(200).send(result)
            } else {
                return res.status(404).send({error: 'Data not found'})
            }
        })
    }))

    app.get("/trips/subtract_booking/:id", ((req, res) => {
        utils.printReqSummary(req)
        db_trips.subtractBooking(req.params.id).then((result) => {
            if (result !== undefined) {
                return res.status(200).send(result)
            } else {
                return res.status(404).send({error: 'Data not found'})
            }
        })
    }))

    app.delete("/trips/:id", ((req, res) => {
        utils.printReqSummary(req)
        db_trips.deleteTrip(req.params.id).then((result) => {
            if (result !== undefined) {
                return res.status(200).send(result)
            } else {
                return res.status(404).send({error: 'Data not found'})
            }
        })
    }))

    app.post("/trips", ((req, res) => {
        utils.printReqSummary(req)
        const trip = req.body
        if (utils.validateTrip(trip)) {
            db_trips.addTrip(trip).then(result => {
                return res.status(200).send(result)
            })
        } else {
            return res.status(404).send({error: 'Invalid trip data'})
        }
    }))

    app.get("/trips", ((req, res) => {
        utils.printReqSummary(req)
        db_trips.getAllTrips().then((trips) => {
            return res.status(200).send(trips)
        })
    }))

    app.get("/trips/:id", ((req, res) => {
        utils.printReqSummary(req)
        db_trips.getTripById(req.params.id).then((trip) => {
            if (trip !== undefined) {
                return res.status(200).send(trip)
            } else {
                return res.status(404).send({error: 'Data not found'})
            }
        })
    }))
}

module.exports = {
    tripsController: tripsController
}
