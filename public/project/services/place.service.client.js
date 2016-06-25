(function () {
    angular
        .module("PlaceConnect")
        .factory("PlaceService", PlaceService);

    function PlaceService($http) {
        var api = {
            findUserPlaceIds:findUserPlaceIds,
            findUserPlaces : findUserPlaces,
            addUserPlace:addUserPlace,
            findPlaceByFid: findPlaceByFid,
            findSimilarUsers: findSimilarUsers
        };
        
        return api;

        function findPlaceByFid(fid) {
            return $http.get("/api/place/" + fid);
        }

        function addUserPlace(userId, place){
            return $http.post("/api/user/" + userId + "/addplace/",  place);
        }
        
        function findUserPlaceIds(userId){
            
        }
        
        function findUserPlaces(userId) {
            return $http.get("/api/user/" + userId + "/places");
        }

        function findSimilarUsers(userId) {
            return $http.get("/api/user/" + userId + "/similar");
        }
    }
    
})();