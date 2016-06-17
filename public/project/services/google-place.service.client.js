(function(){
    angular
        .module("PlaceConnect")
        .factory("GooglePlaceService", GooglePlaceService);

    var key = "AIzaSyCT75d2yeo-VA776u8ZDWiVxck8ZHsT5EM";

    // Allocate a default Langitude and Lattitude
    var pos = {lat: -33.86755700000001, lng: 151.201527};
    var searchurl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=LAT,LNG&radius=500&type=restaurant&name=cruise&key=API_KEY";
    var photourl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=";
    var keyval = "&key=" + key;
    var maxwidth = 400;
    var maxheight = 600;
    var places = [];


    function GooglePlaceService($http, $q) {

        api = {
            getPlaces: getPlaces
        };

        return api;


        //  Note: This requires that you consent to location sharing when prompted by browser
        function getLatLng() {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    //console.log(pos);
                }, function () {
                    return false;
                });
            } else {
                // Browser doesn't support Geolocation
                return false;
            }
        }


        function getPlaces() {

            //var deferred = $q.defer();
            getLatLng();
            // google.maps.event.addDomListener(window, 'load', getPlaces);

            map = new google.maps.Map({
                center: pos,
                zoom: 15
            });

            var request = {
                location: pos,
                radius: '5000',
                query: 'restaurant'
            };

            var service = new google.maps.places.PlacesService(map);
            return service.nearbySearch(request, embedPhotos);

        }




        function embedPhotos(results, status){

            for(var idx in results){
                if (idx == 1 ) {
                    return results;
                }

                if (results[idx]['photos']) {
                    photoobj = results[idx]['photos'][0];
                    results[idx]['icon'] = photoobj.getUrl({'maxWidth': maxwidth, 'maxHeight': maxheight});
                }

                // /*url = photourl + refid + keyval;
                // $http.get(url).then(function (response) {
                //     console.log(response);
                //     results[idx]['icon'] = response;
                // */});
            }
             return results;
        }

    }



})();
