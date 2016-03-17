var pool = require("./dbConnection").connectionPool;
var ideaModel = require("../models/idea");

module.exports.add = function(idea, callback) {
    pool.getConnection(function(connErr, connection) {
        if (connErr) {
            console.error("Connection error inside add method of ideaService.\n" + connErr);
            callback(connErr, false);
        } else {
            ideaModel.add(connection, idea, function(err, result) {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        }
        console.log("Releasing connection inside add method of IdeaService.");
        connection.release();
    });
}

module.exports.list = function(ipp, pn, callback) {
    pool.getConnection(function(connErr, connection) {
        if (connErr) {
            console.error("Connection error inside list method of ideaService.\n" + connErr);
            callback(connErr, false);
        } else {
            ideaModel.list(connection, ipp, pn, function(err, result) {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else {
                    for (var i=0; i<result.length; i++) {
                        delete result[i].creation_time;
                        delete result[i].modification_time;
                    }
                    callback(null, result);
                }
            });
        }
        console.log("Releasing connection inside list method of IdeaService.");
        connection.release();
    });
}

module.exports.get = function(ideaId, callback) {
    pool.getConnection(function(connErr, connection) {
        if (connErr) {
            console.error("Connection error inside get method of ideaService.\n" + connErr);
            callback(connErr, false);
        } else {
            ideaModel.get(connection, ideaId, function(err, result) {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else {
                    delete result.creation_time;
                    delete result.modification_time;
                    callback(null, result);
                }
            });
        }
        console.log("Releasing connection inside get method of IdeaService.");
        connection.release();
    });
}

module.exports.filter = function(filter_criteria, callback) {
    pool.getConnection(function(connErr, connection) {
        if (connErr) {
            console.error("Connection error inside get method of ideaService.\n" + connErr);
            callback(connErr, false);
        } else {
            ideaModel.filter(connection, filter_criteria, function(err, result) {
                 if (err) {
                    console.error(err);
                    callback(err, null);
                } else {
                    console.log('filtered from service layer');
                    callback(null, result);
                }
            });
        }
    });
}
