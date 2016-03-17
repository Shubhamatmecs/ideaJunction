var pool = require("./dbConnection").connectionPool;
var userModel = require("../models/users");
var userDetailsModel = require("../models/userDetails");
var async = require('async');

function rollBack(connection, error, callBack) {
    connection.rollback(function() {
        console.error("Error inside userRegistration rollback " + error);
        callBack(error, false);
    });
}


module.exports.addUser = function(user, callback) {
    pool.getConnection(function(connErr, connection) {
        if(connErr) {
            console.log(connErr);
            callback(connErr, false);
        } else {
            addUser(connection, user, callback);
        }
    });
}

function addUser(connection, user, callback) {
    function createConnection(callback) {
        connection.beginTransaction(function(transErr) {
            if(transErr) {
                console.log(transErr.stack());
                callBack(transErr, false);
            } else {
                callback(null, true);
            }
        });
    }

    function addUser(callback) {
        userModel.addUser(connection, {id: user.id, password: user.password, status_id: 1}, function(addErr, userSuccess) {
            if(addErr) {
                console.log("Add User Error ");
                rollBack(connection, addErr, callback);
            } else {
                callback(null, true);
            }
        });
    }

    function addUserDetails(callback) {
        var userDetails = user.user_details;
        userDetails.user_id = user.id;
        userDetailsModel.addUserDetails(connection, userDetails, function(userDetailsErr, udSuccess) {
             if (userDetailsErr) {
                rollBack(connection, userDetailsErr, callback);
             } else {
                 callback(null, true);
             }
        });
    }
    function doCommit(callback) {
        connection.commit(function(commitErr) {
            if (commitErr) {
                rollBack(connection, commitErr, callback);
            } else {
                callback(null, true);
            }
    });
}

    async.series([createConnection, addUser, addUserDetails, doCommit], function(err, result) {

        console.log("Executed all calls in series." + result);
        if (err && connection) {
            console.log(connection + " rolled back");
        }
        console.log("Releasing the connection");
        connection.release();
        callback(err, result);
    });
}


module.exports.authenticate = function(user, callback) {
    pool.getConnection(function(connErr, connection) {
        if (connErr) {
            console.error(connErr);
            callback(connErr, false);
        } else {
            userModel.authenticate(connection, user, function(err, response) {
                if (err) {
                    console.error(err);
                    callback(err, false);
                } else {
                    callback(null, response);
                }
                console.log("Releasing the connection in authenticate method of userServices.");
                connection.release();
            });
        }
    });
}

module.exports.changePassword = function(user, callback){
    pool.getConnection(function(connErr, connection){
        if (connErr){
            console.error(connErr);
            callback(connErr, false);
        } else {
            userModel.changePassword(connection, user, function(err, response){
                if (err) {
                    console.error(err);
                callback(err, true);
                } else {
                    callback(null, response);
                }
                console.log("Releasing the connection in changePassword method of userServices.");
                connection.release();
            });
        }
    });
}
