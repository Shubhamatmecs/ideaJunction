var ideaService = require("../services/ideaService");

//   An idea that is not dangerous is unworthy of being called an idea at all.

module.exports = function(app) {
    app.post("/ideas", function(req, res) {
       var idea = req.body;
       idea.user_id = req.session.user.id;

       ideaService.add(idea, function(err, response) {
            if (err || response == null) {
                console.error(err);
                res.statusCode = 500;
                console.log("Error is " + err);
                res.end("Unknown server error occurred. Contact ATMECS support team.");
            }
            res.statusCode = 200;
            res.end("Idea added.");
        });
    });

    app.get("/ideas/:itemsPerPage/:pagenumber", function(req, res) {
       var ipp = (req.params.itemsPerPage-1) * req.params.pagenumber;
       var pn = parseInt(req.params.pagenumber);
       ideaService.list(ipp ,pn, function(err, response) {
            if (err || response == null) {
                console.error(err);
                res.statusCode = 500;
                console.log("Error is " + err);
                res.end("Unknown server error occurred. Contact ATMECS support team.");
            }
            res.statusCode = 200;
            res.json(response);
        });
    });

        app.get("/ideas/filter", function(req, res) {
           var filter_criteria = {ipp: req.param('itemsPerPage'), pn: req.param('pagenumber'), start_date: req.param('start_date'), end_date: req.param('end_date'), author: req.param('author'), title: req.param('title')}
           ideaService.filter(filter_criteria, function(err, response) {
                if (err || response == null) {
                    console.error(err);
                    res.statusCode = 500;
                    console.log("Error is " + err);
                    res.end("Unknown server error occurred. Contact ATMECS support team.");
                }
                res.statusCode = 200;
                console.log("Filtered Sucessfully");
                res.json(response);
            });
        });

    app.get("/ideas/:ideaId", function(req, res) {
       ideaService.get(req.params.ideaId, function(err, response) {
            if (err || response == null) {
                console.error(err);
                res.statusCode = 500;
                console.log("Error is " + err);
                res.end("Unknown server error occurred. Contact ATMECS support team.");
            }
            res.statusCode = 200;
            res.json(response);
        });
    });
}
