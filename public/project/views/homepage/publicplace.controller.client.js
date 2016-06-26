(function(){
    angular
        .module("PlaceConnect")
        .controller("PublicPlaceController", PublicPlaceController);

    function PublicPlaceController($location, $rootScope,FourSquareService, $routeParams, PlaceService) {
        var vm = this;
        vm.fid = $routeParams.placeId;
        vm.sessionUser = $rootScope.sessionUser;
        console.log(vm.sessionUser);

        var mapurl = "https://maps.googleapis.com/maps/api/staticmap?center=LNL&zoom=15&size=500x300&sensor=false&markers=color:red%7Clabel:P%7CLNL";

        function init(){
            FourSquareService
                .placeDetails(vm.fid)
                .then(function (response) {
                    var data = extractDetails(response.data);
                    vm.place = augmentData(data);
                    
                    PlaceService
                        .getPlaceReviews(vm.fid)
                        .then(function (reviews) {
                            var rdata = reviews.data;
                            vm.place['reviews'] = rdata;
                    }, function (err) {
                            vm.error = "Not able to fetch reviews";
                        })
            }, function (err) {
                    vm.error = "Could not fetch details";
                });
            
        }

        // Call the init to initialize
        init();


        function extractDetails(data){
                var myplace = {};
                var place = data['response']['venue'];

                if (place['categories']){
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

            

            return myplace;

        }

        function extractPhoto(place){
            if (place['bestPhoto']){
                var phobj = place['bestPhoto'];
                var url = phobj['prefix'] + "500x300" + phobj['suffix'];
                return url;

            } else if(place['photos']['count'] > 0){
                var phobj = place['photos']['groups']['items'][0];
                var url = phobj['prefix'] + "500x300" + phobj['suffix'];
                return url;
            } else {
                return "/uploads/missing_place_pic.jpeg";
            }
        }

        function augmentData(place) {
            var latlng = place['lat'] + "," + place['lng'];
            var url = mapurl.replace(/LNL/g, latlng);
            place['map'] = url;


            return place;
        }
    }

})();