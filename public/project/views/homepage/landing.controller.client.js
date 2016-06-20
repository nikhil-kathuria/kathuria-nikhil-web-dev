(function(){
    angular
        .module("PlaceConnect")
        .controller("LandingController", LandingController);

    function LandingController($location, GooglePlaceService, FourSquareService) {

        var vm = this;
        vm.currentPlaces = currentPlaces;
        vm.place = "My Place";
        vm.places = [];


        function searchPlaces(){
            FourSquareService
                .searchPlaces().then( function (response) {
                    console.log(response.data);
                    var results = response.data['response']['groups'][0]['items'];
                    if(results.length > 0){
                        vm.places = extractPlaces(results);
                    } else {
                        vm.error = "No places found";
                    }
                }, function (err) {
                    vm.error = "err";
                }

            );
        }

        function extractPlaces(results){
            var places = [];

            for(var idx in results){
                var myplace = {};
                var place = results[idx]['venue'];

                if (results['idx']['categories']){
                    myplace['category'] = results['idx']['categories'][0]['name'];
                }




                myplace['name'] = place['name'];
                myplace['fid'] = place['id'];

                myplace['address'] = place['location']['address'];
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
                return "../uploads/default1.png";
            }
        }
        
        function currentPlaces(){
            // GooglePlaceService
            //     .getPlaces()
            //     .then(function (response) {
            //         vm.places = response;
            //         console.log(vm.places);
            //     });
            vm.places = GooglePlaceService.getPlaces();
            console.log(vm.places);
        }

        searchPlaces();
    }

})();