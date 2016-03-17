var constants = require("../utilities/constants");
var status = constants.user_status;

module.exports.addUser = function(connection, user, callback) {
    connection.query('INSERT INTO users SET ?', user, function(error, rows) {
        if (error) {
            console.error("Problem is there in adding user.");
            callback(error, false);
        } else {
           console.log("Record added is user.");
           callback(null, true); 
        }
    });
}

module.exports.authenticate = function(connection, user, callback) {
    console.log("status expected is " + status.active.description);
    connection.query("SELECT * FROM users WHERE id= ?", [user.id], function(error, rows) {
        if (error) {
            console.log("Error during user retrieval.");
            callback(error, "");
        } else {
            console.log("Rows retrieved are " + rows.length);
            if (rows.length == 0 || rows[0].id != user.id || rows[0].password != user.password) {
                callback(null, "Invalid");
            } else {
                console.log("Status generated is " + constants.getUserStatusDescById(rows[0].status_id));
                callback(null, constants.getUserStatusDescById(rows[0].status_id));
            }
        }
    });
}

module.exports.changePassword = function(connection, user, callback){
    connection.query("SELECT * FROM users WHERE id= ?", [user.id], function(error, rows){
        if (error) {
            console.log("Error during user retrieval.");
            callback(error, "");
        } else {
            console.log("Rows retrieved are " + rows.length);
            if ((rows.length != 0 || rows[0].id == user.id) && rows[0].password != user.newPassword) {
                connection.query("UPDATE users SET password = ? WHERE id = ?", [user.newPassword, user.id], function(error, rows){
                        if (error){
                            console.log("Error during password updating.");
                            callback(error, "");    
                        } else {
                            callback(null, true);
                        }
                    });
            } else {
                callback(null, false);
            }
        }
    });
}