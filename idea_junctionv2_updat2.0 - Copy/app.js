// Import various modules.
var express = require("express");
var session = require("express-session");
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');


// Inititalize express app and set the engine as ejs.
var app = express();

// Express app to use a session for user session management.
app.use(session({
    secret: process.env.SESSION_SECRET || '57f3e31d-59e2-4994-b0e9-14d75f4a44f6',
    resave: false,
    saveUninitialized : false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname+ '/client'));
app.use(bodyParser.json());
app.use('/client',express.static(__dirname + '/client'));

app.get('/',function (req,res) {
   res.sendFile(path.join(__dirname + '/client/index.html'));
});

//Interceptor for User Authentication.
app.use(function(req, res, next) {
    console.log("Absolute url is " + req.path);
    if ((req.session && req.session.user && req.session.user.id)
         ||
        (req.path == "/users/login" || req.path == "/users/register")) {
        next();
    } else {
       res.statusCode = 401;
       res.end("User is not Authenticated to use this service. Login if existing user else register.")
    }
});

function recursiveRoutes(folderName) {
    fs.readdirSync(folderName).forEach(function(file) {
        var fullName = path.join(folderName, file);
        var stat = fs.lstatSync(fullName);

        if (stat.isDirectory()) {
            recursiveRoutes(fullName);
        } else if (file.toLowerCase().indexOf('.js')) {
            console.log("require('" + fullName + "')");
            require('./' + fullName)(app);
        }
    });
}
recursiveRoutes("controller");

// Setting the port.
var server = app.listen(process.env.PORT || 1337, function(){
    console.log("App Started on PORT 1337");
});

server.timeout = process.env.SERVER_TIMEOUT || 15000;
