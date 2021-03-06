(function(){
    angular
        .module("PlaceConnect")
        .controller("AddPlaceController", AddPlaceController);

    function AddPlaceController($location, FourSquareService, $rootScope, $routeParams, PlaceService) {

        var vm = this;
        vm.userId = $routeParams.userId;
        vm.serchByProximity = serchByProximity;
        vm.addPlace = appPlace;


        function appPlace(place){
            PlaceService
                .addUserPlace(vm.userId, place)
                .then(function () {
                    $location.url("/user/" + vm.userId + "/place");
                }, function(err){
                    vm.error = err;
            });
        }

        function serchByProximity(word, query){
            if (word && query){
            FourSquareService
                .serchByProximity(word, query)
                .then( function (response) {
                    var results = response.data['response']['groups'][0]['items'];
                    if(results.length > 0){
                        vm.places = extractPlaces(results);
                    } else {
                        vm.error = "No places of interest found";
                    }
                }, function (err) {
                    vm.error = "err";
                });
            } else {
                vm.error = "We are sorry but both Search Query and Location required";
            }
        }

        function extractPlaces(results){
            var places = [];

            for(var idx in results){
                var myplace = {};
                var place = results[idx]['venue'];

                if (place['categories'].length > 0){
                    myplace['category'] = place['categories'][0]['name'];
                }


                myplace['name'] = place['name'];
                myplace['fid'] = place['id'];

                myplace['address'] = place['location']['address'];
                myplace['city'] = place['location']['city'];
                myplace['state'] = place['location']['state'];
                myplace['country'] = place['location']['country'];

                myplace['lat'] = place['location']['lat'];
                myplace['lng'] = place['location']['lng'];

                myplace['photo'] = extractPhoto(place);

                places.push(myplace);

            }

            return places;

        }

        function extractPhoto(place){
            if (place['featuredPhotos']){
                var phobj = place['featuredPhotos']['items'][0];
                var url = phobj['prefix'] + "500x300" + phobj['suffix'];
                return url;

            } else if(place['photos']['count'] > 0){
                var phobj = place['photos']['items'][0];
                var url = phobj['prefix'] + "500x300" + phobj['suffix'];
                return url;
            } else {
                return "/uploads/missing_place_pic.jpeg";
            }
        }
    }


})();