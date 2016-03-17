var likeService = require("../services/likeService");


module.exports = function(app) {
    app.post("/likes/like", function(req, res) {
            console.log(req.session.user.id + " " + req.body.idea_id);
            var like = {user_id: req.session.user.id, idea_id: req.body.idea_id};
            likeService.likeIdea(like, function(err, result) {
                if (err) {
                    if (err.message.indexOf("Duplicate entry") > -1) {
                        res.statusCode = 403;
                        console.error("User already liked this idea.");
                        res.end("User already liked this idea.");
                    } else {
                        console.error("Unexpected error \n" + err.message);
                        res.statusCode = 500;
                        res.end("Unexpected error. Contact ATMECS support team.");
                    }
                } else if (!result) {
                        console.error("User cannot like his own Idea.");
                        res.statusCode = 403;
                        res.end("User cannot like his own Idea.");
                } else {
                    res.statusCode = 200;
                    res.end("Idea is liked.");
                }
            });
    });

    app.get("/likes/liked/:idea_id", function(req, res) {
            var like = {user_id: req.session.user.id, idea_id: req.params.idea_id};
            console.log(req.session.user.id + " idea id is  " + req.params.idea_id);
            likeService.isIdeaLiked(like, function(err, result) {
                if (err) {
                    console.error("Unexpected error " + err);
                    res.statusCode = 500;
                    res.end("fail");
                } else {
                    console.log("Some output " + result);
                    res.statusCode = 200;
                    res.end((result)? "yes" : "no");
                }
            });
    });
}
