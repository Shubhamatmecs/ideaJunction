module.exports.likeIdea = function(connection, like, callback) {
    connection.query('INSERT INTO likes SET ?', like, function(error, rows) {
        if (error) {
            console.error("Problem is there in adding like.\n" + error);
            callback(error, false);
        } else {
            console.log("Idea " + like.idea_id + " is liked by " + like.user_id);
            callback(null, true);
        }
    });
}

module.exports.isIdeaLiked = function(connection, like, callback) {
    console.log("User and Idea check " + like.user_id + " " + like.idea_id);
    connection.query("SELECT 1 AS liked FROM  likes WHERE user_id = ? AND idea_id = ?", [like.user_id, like.idea_id],
                     function(error, rows) {
                            if (error) {
                                console.error("Problem is there in adding like.\n" + error);
                                callback(error, false);
                            } else {
                                callback(null, rows.length > 0);
                            }
                     });
}