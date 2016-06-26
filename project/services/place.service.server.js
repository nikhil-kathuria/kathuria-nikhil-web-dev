
module.exports = function(app, model){

    var userModelProject = model.userModelProject;
    var placeModel = model.placeModel;
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.get("/api/user/:userId/places", findUserPlaces);
    app.get("/api/user/:userId/similar", findSimilarUsers);
    app.post("/api/user/:userId/addplace", addUserPlace);
    app.get("/api/place/:Fid", findPlaceByFid);
    app.post("/api/place/:Fid/addreview", addPlaceReview);
    app.get("/api/place/:Fid/review", getPlaceReviews);
    app.delete("/api/place/:Fid/review/:reviewId", deletePlaceReview);

    
    function deletePlaceReview(req, res) {
        var rid = req.params.reviewId;
        var fid = req.params.Fid;
        placeModel
            .deletePlaceReview(fid, rid)
            .then(function (rid) {
                res.send(200);
        }, function(err){
                res.status(400).send("Error occurred");
            });
    }
    
    function getPlaceReviews(req, res) {
        var fid = req.params.Fid;
        placeModel
            .findPlaceByFid(fid)
            .then(function (place) {
                var review = place.reviews;
                res.json(reviews);
            }, function (err) {
                res.status(404).send("No reviews available for this post")
            });
    }


    function findPlaceByFid(req, res){
        var fid = req.params.Fid;
        placeModel
            .findPlaceByFid(fid)
            .then(function ( place) {
                res.json(place);
            }, function (err) {
                res.status(404).send("Place not found :(")
            });
    }
    
    function addPlaceReview(req, res) {
        var review =  req.body;
        var fid = req.params.Fid;
        placeModel
            .addPlaceReview(fid, review)
            .then(function (response) {
            res.send(200);
        }, function (err) {
                res.status(400).send("Review not added");
            });
        
        
    }
    
    function addUserPlace(req, res){
        var userId = req.params.userId;
        var place = req.body;
        var fid = place['fid'];

        placeModel.findPlaceByFid(fid).then(function (response) {
            if (response === null) {
                placeModel
                    .createPlace(place)
                    .then(function (response) {
                        userModelProject
                            .addPlace(userId, fid)
                            .then(function (response) {
                                res.send(200);
                            }, function(err) {
                                res.status(400).send("The place was not added");
                            });

            });
        } else {
                userModelProject
                    .addPlace(userId, fid)
                    .then(function (response) {
                        res.send(200);
                    }, function(err) {
                        res.status(400).send("The place was not added");
                    });
            }
        } , function (err) {
            res.status(400).send("The place was not added");
        });
    }


    function findUserPlaces(req, res) {
        var userId = req.params.userId;

        userModelProject
            .findUserById(userId)
            .then(function (user) {
                var ids = user.places;
                placeModel
                    .findPlaceByIds(ids)
                    .then( function (places) {
                        res.json(places);
                }, 
                        function(err){
                    res.status(404).send("No Places found");
                });
                
            }, function (err) {
                res.status(404).send("User not found");
            });
    }

    function findSimilarUsers(req, res) {
        var userId = req.params.userId;

        userModelProject
            .findUserById(userId)
            .then(function (user) {
                var ids = user.places;
                userModelProject
                    .getAllUsers()
                    .then( function (users) {
                        var rank = getRecommendation(ids, users);
                        res.json(rank);
                })
            }, function (err) {
                res.send(404).send("Could not find similar users");
            });
    }

    function getRecommendation(ids, users) {
        var array = [];
        for (usx in users){
            var places = users[usx]['places'];
            var counter = 0;

            for (var idx in ids){
                if (places.indexOf(ids[idx]) !== -1){
                    counter++;
                }
            }
            if (counter > 0 ){
                var obj = {
                    "_id" :users[usx]['_id'],
                    "username" : users[usx]['username'],
                    "pic" : users[usx]['pic'],
                    "common" : counter,
                };

                array.push(obj);
            }
        }
        return array;
    }

};