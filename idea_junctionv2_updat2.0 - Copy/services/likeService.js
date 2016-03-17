var pool = require("./dbConnection").connectionPool;
var likeModel = require("../models/like");
var ideaModel = require("../models/idea");

module.exports.likeIdea = function(like, callback) {
    pool.getConnection(function(connErr, connection) {
        if (connErr) {
            console.error("Connection error inside likeIdea method.\n" + connErr);
            callback(connErr, null);
        } else {
            ideaModel.get(connection, like.idea_id, function(err, result) {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else {
                    console.log("Like id "+ like.user_id +"  result user id " + result.user_id);
                        if (like.user_id == result.user_id){
                            console.error("Cannot like your own idea");
                            callback(null, false);
                        } else {
                                likeModel.likeIdea(connection, like, function(err, result) {
                                    if (err) {
                                        console.error(err);
                                        callback(err, null);
                                    } else {
                                        callback(null, true);
                                    }
                                });
                               }
                            }
                      });
                   }
        console.log("Releasing connection inside likeIdea method of likeServices.");
        connection.release();
    });
}

module.exports.isIdeaLiked = function(like, callback) {
    pool.getConnection(function(connErr, connection) {
        if (connErr) {
            console.error("Connection error inside isIdealiked method.\n" + connErr);
            callback(connErr, false);
        } else {
            likeModel.isIdeaLiked(connection, like, function(err, result) {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        }
        console.log("Releasing connection inside isIdeaLiked method of likeServices.");
        connection.release();
    });
}
