var userService = require("../services/userServices");
var constants = require("../utilities/constants");
var status = constants.user_status;

module.exports = function (app) {
    /*app.post("/login", function(req, res) {
        var sess = req.session;
        var user_id = req.body.user_id;
        var pwd = req.body.pwd;
        if (user_id === "baba" && pwd === "baba") {
            console.log("Correct credentials.");
            sess.user = {id: req.body.user_id};
            res.render("landing");
        }
    });
*/
    app.get("/logout", function(req, res) {
        logout(req, res);
    });

    app.post("/users/register", function(req, res) {
        userService.addUser(req.body, function(err, success) {
            console.log("Inside Add User method of controller users and route /register with post.");
            if (err) {
                console.log(err);
                if (err.code == "ER_DUP_ENTRY") {
                    res.statusCode = 400;
                    res.end("User with id " + req.body.id + " already exists.");
                }
                res.statusCode = 500;
                res.end("User with id " + req.body.id + " failed to create due to internal server error.");
            }

            if (success) {
                res.statusCode = 200;
                req.session.user = {id: req.body.id};
              //  res.end("User with id " + req.body.id + " created successfully.");
                  res.end("true");
            }
        });
    });

    app.post("/users/login", function(req, res) {
        userService.authenticate(req.body, function(err, response) {
            if (err || response == null) {
                console.error(err);
                res.statusCode = 500;
                console.log("Error is " + err);
                res.end("Unknown server error occurred. Contact ATMECS support team.");
            }

            res.statusCode = (response == status.active.description) ? 200 : 401;
            if (res.statusCode == 200) {
                req.session.user = {id: req.body.id};
            }
            res.end(response == status.active.description ?
                    "Valid user": (response == "Invalid")? "Invalid Credentials": "User is currenlty " + response + ". Contact Admin.");

        });
    });

    app.put("/users/changePassword", function(req, res) {
        var user = req.body;
        user.id = req.session.user.id;
        console.log(user);
        userService.changePassword(user, function(err, response) {
            console.log(response);
            if (!response) {
                console.error(err);
                res.statusCode = 403;
                //console.log("Error is " + err);
                console.log("Please enter different password.")
                res.end("false");
            } else if (err || response == null) {
                console.error(err);
                res.statusCode = 500;
                console.log("Error is " + err);
                res.end("Unknown server error occurred. Contact ATMECS support team.");
            } else {
                res.statusCode = 200;
                res.end("true");
            }
        });
    });

}

function logout(req, res) {
    req.session.destroy(function(err, data) {
        console.log("Cleared session data.");
    });
    res.end("true");
}
