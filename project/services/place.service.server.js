
module.exports = function(app, model){

    var userModelProject = model.userModelProject;
    var placeModel = model.placeModel;
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.get("/api/users/:userId/places", findUserPlaces);
    app.get("/api/users/similar/:userId", findSimilarUsers);



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