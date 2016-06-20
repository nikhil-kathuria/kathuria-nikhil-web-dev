(function(){
    angular
        .module("PlaceConnect")
        .factory("FourSquareService", FourSquareService);



    // Allocate a default Langitude and Lattitude
    var fsqr = "https://api.foursquare.com/v2/venues/explore?client_id=CLNTID&client_secret=CLNTSCRT&ll=LNL&venuePhotos=1&v=20160215";
    var pos = "42.345397399999996,-71.0843031";
    var client_id = "MDWQ1E1IPF5E5N0YYNTHIE4JPJL1ZBMCQJDIDVHYLAK1111B";
    var client_secret = "JMDAI30M1OXQO20CORCKUTVLL5YS1MSVPEHQO20PYINLKWTN";

    function FourSquareService($http) {
        api = {
            searchPlaces : searchPlaces
        };
        
        return api;
        
        function searchPlaces(){
            var url = fsqr
                .replace("CLNTID", client_id)
                .replace("CLNTSCRT", client_secret)
                .replace("LNL", pos);
            return $http.get(url);
        }
    }
    
    



})();