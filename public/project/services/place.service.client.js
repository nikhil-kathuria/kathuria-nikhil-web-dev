(function () {
    angular
        .module("PlaceConnect")
        .factory("PlaceService", PlaceService);

    function PlaceService($http) {
        var api = {
            findUserPlaceIds:findUserPlaceIds,
            findUserPlaces : findUserPlaces
        };
        
        return api;
        
        function findUserPlaceIds(userID){
            
        }
        
        function findUserPlaces(userID) {
            $http.get("/api/user/places/" + userId);
        }


    }
    
})();