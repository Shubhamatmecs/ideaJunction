var mysql = require("mysql");
var pool  =  mysql.createPool({
    connectionLimit : 1000, //important
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'idea_junction',
    debug    :  false
});

module.exports.connectionPool = pool;
