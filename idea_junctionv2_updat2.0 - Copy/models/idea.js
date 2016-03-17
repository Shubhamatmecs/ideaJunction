var mysql = require("mysql");

module.exports.add = function(connection, idea, callback) {
    connection.query('INSERT INTO ideas SET ?', idea, function(error, rows) {
        if (error) {
            console.error("Problem is there in adding idea.");
            callback(error, false);
        } else {
           console.log("Record idea is added.");
           callback(null, true);
        }
    });
}

module.exports.list = function(connection, recordSize, pageNumber, callback) {
    var sql = "SELECT * FROM ideas ORDER by creation_time DESC LIMIT " +
                 connection.escape(recordSize) + " ," + connection.escape(pageNumber);
    connection.query(sql, function(error, rows) {
        if (error) {
            console.error("Problem is there in listing ideas.");
            callback(error, false);
        } else {
           console.log("Ideas retrieved.");
           callback(null, rows);
        }
    });
}

module.exports.get = function(connection, ideaId, callback) {
    connection.query('SELECT * FROM ideas where id = ?', [ideaId], function(error, rows) {
        if (error) {
            console.error("Problem is there in listing ideas.");
            callback(error, false);
        } else {
           console.log("Record idea is added.");
           callback(null, rows[0]);
        }
    });
}

module.exports.filter = function(connection, filter_criteria, callback) {
    var qury = "select i.title, ud.display_name, u.id, ud.first_name, ud.last_name, ud.middle_name, i.creation_time," +
     "i.id from ideas i join users u on u.id = i.user_id join user_details ud on i.user_id = ud.user_id ";
    var status = false;
    if(filter_criteria.start_date != null || filter_criteria.end_date != null || filter_criteria.title != null || filter_criteria.author != null ) {
        qury = qury + "where ";
        filter_criteria.start_date = filter_criteria.start_date + " 00:00:00";
        filter_criteria.end_date = filter_criteria.end_date + " 23:59:59";
        for(var key in filter_criteria) {
          if (filter_criteria[key] != null) {
            if(key == "title" && filter_criteria[key] != "undefined") {
                if (status) {
                    qury = qury + " and ";
                }
                qury = qury + " i.title like \"%"  +filter_criteria[key] + "%\" ";
                status = true;
            }
            else if (key == "author" && filter_criteria[key] != "undefined") {
                if (status) {
                    qury = qury + " and ";
                }
                qury = qury + " ud.display_name like \"%"+filter_criteria[key]+"%\" ";
                status =true;
            }
            else if (key == "start_date" && filter_criteria[key] != "undefined 00:00:00") {
                if (status) {
                    qury = qury + " and ";
                }
                qury = qury + " i.creation_time > '" + filter_criteria[key] + "'";
                status =true;
            }
            else if (key == "end_date" && filter_criteria[key] != "undefined 23:59:59") {
                if (status) {
                    qury = qury + "and ";
                }
                qury = qury + " i.modification_time < '" + filter_criteria[key] + "'";
                status =true;
            }
        }
    }
  }
    qury = qury + " order by i.creation_time desc LIMIT " + filter_criteria.pn + "," + filter_criteria.ipp;
    console.log(qury);
    connection.query(qury, function(error, rows) {
        if (error) {
            console.error("Problem is there in listing ideas.");
            callback(error, false);
        } else {
           console.log("Record idea is added.");
           callback(null, rows);
        }
    });

}
