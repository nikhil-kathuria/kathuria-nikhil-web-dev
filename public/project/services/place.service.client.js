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
        
        function findUserPlaceIds(userId){
            
        }
        
        function findUserPlaces(userId) {
            return $http.get("/api/user/" + userId + "/places");
        }


    }
    
})();