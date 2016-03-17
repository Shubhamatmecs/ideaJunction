var pool = require("./dbConnection").connectionPool;
var userDetailsModel = require("../models/userDetails");

module.exports.getUserDetails = function(user_id, callback) {
    pool.getConnection(function(connErr, connection) {
        if (connErr) {
            console.error("Connection error inside getUserDeetails method.\n" + connErr);
            callback(connErr, false);
        } else {
            userDetailsModel.getUserDetails(connection, user_id, function(err, result) {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else {
                    delete result.id;
                    delete result.creation_time;
                    delete result.modification_time;
                    callback(null, result);
                }
            });
        }
        console.log("Releasing connection inside getUserDetails method of userDetailsService.");
        connection.release();
    });
}

module.exports.updateUserDetails = function(userDetails, callback) {
    pool.getConnection(function(connErr, connection) {
        if (connErr) {
            console.error("Connection error inside updateUserDetails method.\n" + connErr);
            callback(connErr, false);
        } else {
            userDetailsModel.updateUserDetails(connection, userDetails, function(err, result) {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        }
        console.log("Releasing connection inside getUserDetails method of userDetailsService.");
        connection.release();
    });
}
