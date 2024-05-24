const db_users = require("../db/db_users_service");
const utils = require("../utils");

function usersController(app) {
    app.delete("/users/:id", ((req, res) => {
        utils.printReqSummary(req)
        db_users.deleteUser(req.params.id).then((result) => {
            if (result !== undefined) {
                return res.status(200).send(result)
            } else {
                return res.status(404).send({error: 'Data not found'})
            }
        })
    }))

    app.post("/users", ((req, res) => {
        utils.printReqSummary(req)
        const user = req.body
        if (utils.validateUser(user)) {
            db_users.addUser(user).then(result => {
                return res.status(200).send(result)
            })
        } else {
            return res.status(404).send({error: 'Invalid user data'})
        }
    }))

    app.get("/users", ((req, res) => {
        utils.printReqSummary(req)
        db_users.getAllUsers().then((users) => {
            return res.status(200).send(users)
        })
    }))

    app.get("/users/:id", ((req, res) => {
        utils.printReqSummary(req)
        db_users.getUserById(req.params.id).then((user) => {
            if (user !== undefined) {
                return res.status(200).send(user)
            } else {
                return res.status(404).send({error: 'Data not found'})
            }
        })
    }))
}

module.exports = {
    usersController: usersController
}
