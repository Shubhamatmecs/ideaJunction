var userDetailsService = require("../services/userDetailsService");

module.exports = function(app) {
    app.get("/users/userDetails", function(req, res) {
        console.log("Inside userdetails " + req.session.user.id);
        userDetailsService.getUserDetails(req.session.user.id, function(err, result) {
            if (err) {
                console.error("Error occured as part of userDetails retrieval web service " + err);
                res.statusCode = 500;
                res.end("Unexpected error occurred while retrieving user details.")
            } else {
                res.json(result);
                res.end();
            }
        });
    });

    app.put("/users/updateUserDetails", function(req, res) {
        console.log("Inside userdetails " + req.session.user.id);
        var userDetails = req.body;
        userDetails.user_id = req.session.user.id;
        console.log(userDetails.email);
        userDetailsService.updateUserDetails(userDetails, function(err, result) {
            if (err) {
                console.error("Error occured as part of userDetails update web service " + err);
                res.statusCode = 500;
                res.end("Unexpected error occurred while updating user details.")
            } else {
                res.end("true");
            }
        });
    });
 }

