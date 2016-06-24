
module.exports = function(app, model){

    var userModelProject = model.userModelProject;
    var placeModel = model.placeModel;
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.get("/api/user/:userId/places", findUserPlaces);
    app.get("/api/user/similar/:userId", findSimilarUsers);
    app.post("/api/user/:userId/addplace", addUserPlace);
    app.get("/api/place/:Fid", findPlaceByFid);


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
    
    function addUserPlace(req, res){
        var userId = req.params.userId;
        var place = req.body;
        var fid = place['fid'];

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
        }, function (err) {
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

    function findSimilarUsers() {
        var userId = req.param.userId;

        userModelProject
            .findUserById(userId)
            .then(function (user) {
                var ids = user.places;
                userModelProject
                    .findAll()
                    .then( function (all) {
                        var rank = getRecomendation(ids, all);
                        res.json(rank);
                })
            }, function (err) {
                vm.error="No Similar users found";
            });
    }

    function getRecomendation(ids, users) {
        var map = {};
        for (usx in users){
            var places = users[usx]['places'];
            var counter = 0;

            for (var idx in ids){
                if (places.indexOf(ids[idx]) !== -1){
                    counter++;
                }
            }
            if (counter >=0 ){
                map[users[usx]] = counter;
            }
        }
        return map;
    }

};