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



    function GooglePlaceService($http) {

        api = {
            getPlaces: getPlaces
        };

        return api;


        //  Note: This requires that you consent to location sharing when prompted by browser
        function getLatLng() {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    console.log(position);
                    pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                }, function () {
                    return false;
                });
            } else {
                // Browser doesn't support Geolocation
                return false;
            }
        }


        function getPlaces() {
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

            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, embedPhotos);

        }




        function embedPhotos(results, status){
            console.log(results);

            for(var idx in results){

                refid = results[idx]['reference'];

                url = photourl + refid + keyval;
                $http.get(url).then(function (response) {
                    console.log(response);
                    results[idx]['icon'] = response;
                });


            }
            return results;
        }


    }



})();
