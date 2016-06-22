(function(){
    angular
        .module("PlaceConnect")
        .controller("LandingController", LandingController);

    function LandingController($location, FourSquareService, $rootScope) {

        var vm = this;
        vm.searchPlaces = searchPlaces;
        var pos = "-33.86755700000001" + ","  + "151.201527";
        vm.user = $rootScope.currentUser;

        function init(){

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    pos = position.coords.latitude + "," + position.coords.longitude;
                    vm.pos = pos;
                    console.log(vm.pos);
                }, function (err) {
                }, { 
                    timeout: 5000
                });
            }
            vm.pos = pos;
            console.log(vm.pos);
        }

        init();

        function searchPlaces(query){
            FourSquareService
                .searchPlaces(vm.pos, query)
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
        }

        function extractPlaces(results){
            var places = [];

            for(var idx in results){
                var myplace = {};
                var place = results[idx]['venue'];

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
                return "../uploads/default2.jpeg";
            }
        }




    }

})();