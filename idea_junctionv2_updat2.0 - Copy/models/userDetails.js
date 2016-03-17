module.exports.addUserDetails = function(connection, userDetails, callback) {
    connection.query('INSERT INTO user_details SET ?', userDetails, function(error, rows) {
        if (error) {
            console.error("Problem is there in adding user details.");
            callback(error, false);
        } else {
            console.log("User details added.");
            callback(null, true);
        }
    });
}

module.exports.getUserDetails = function(connection, user_id, callback) {
    connection.query('SELECT * FROM user_details where user_id = ?', [user_id], function(error, rows) {
        if (error) {
            console.error("Problem is there in adding user details.");
            callback(error, false);
        } else {
            console.log("User details added.");
            callback(null, rows[0]);
        }
    });
}

module.exports.updateUserDetails = function(connection, userDetails, callback) {
    connection.query('UPDATE user_details SET email = ?, first_name = ?, last_name = ?, middle_name = ?, display_name = ?, mobile_number = ? WHERE user_id = ?', [userDetails.email,  userDetails.first_name, userDetails.last_name, userDetails.middle_name, userDetails.display_name, userDetails.mobile_number, userDetails.user_id], function(error, rows){
        if (error) {
            console.error("Problem is there in updating user details.");
            callback(error, false);
        } else {
            console.log("User details updated and rows effected are " + rows.changedRows);
            callback(null, rows.changedRows > 0);
        }
    });
}

