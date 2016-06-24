(function () {
    angular
        .module("PlaceConnect")
        .factory("PlaceService", PlaceService);

    function PlaceService($http) {
        var api = {
            findUserPlaceIds:findUserPlaceIds,
            findUserPlaces : findUserPlaces,
            addUserPlace:addUserPlace
        };
        
        return api;

        function addUserPlace(userId, place){
            return $http.post("/api/user/" + userId + "/addplace/",  place);
        }
        
        function findUserPlaceIds(userId){
            
        }
        
        function findUserPlaces(userId) {
            return $http.get("/api/user/" + userId + "/places");
        }


    }
    
})();