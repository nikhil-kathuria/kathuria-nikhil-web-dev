(function(){
    angular
        .module("PlaceConnect")
        .factory("FourSquareService", FourSquareService);



    // Allocate a default Langitude and Lattitude
    var fsqr = "https://api.foursquare.com/v2/venues/explore?client_id=CLNTID&client_secret=CLNTSCRT&ll=LNL&venuePhotos=1&v=20160215&query=QURY";
    var fsqr2 = "https://api.foursquare.com/v2/venues/explore?client_id=CLNTID&client_secret=CLNTSCRT&near=NEAR&venuePhotos=1&v=20160215&query=QURY";
    var fsqr3 = "https://api.foursquare.com/v2/venues/FID?client_id=CLNTID&client_secret=CLNTSCRT&v=20160215";
    var pos = "42.345397399999996,-71.0843031";
    var client_id = "MDWQ1E1IPF5E5N0YYNTHIE4JPJL1ZBMCQJDIDVHYLAK1111B";
    var client_secret = "JMDAI30M1OXQO20CORCKUTVLL5YS1MSVPEHQO20PYINLKWTN";

    function FourSquareService($http) {
        api = {
            searchPlaces: searchPlaces,
            serchByProximity: serchByProximity,
            placeDetails: placeDetails
        };
        
        return api;

        function searchPlaces(pos,query){
            var finalquery = query.replace(/\s+/g, '%20');
            var url = fsqr
                .replace("CLNTID", client_id)
                .replace("CLNTSCRT", client_secret)
                .replace("QURY", finalquery)
                .replace("LNL", pos);

            return $http.get(url);
            }
    
    
    function serchByProximity(near, query) {
        var finalquery = query.replace(/\s+/g, '%20');
        var proximity = near.replace(/\s+/g, ',');
        var url = fsqr2
            .replace("CLNTID", client_id)
            .replace("CLNTSCRT", client_secret)
            .replace("QURY", finalquery)
            .replace("NEAR", proximity);
        
        return $http.get(url);
    }

        function placeDetails(fid){
            var url = fsqr3
                .replace("CLNTID", client_id)
                .replace("CLNTSCRT", client_secret)
                .replace("FID", fid);
            return $http.get(url);
        }

    }



})();