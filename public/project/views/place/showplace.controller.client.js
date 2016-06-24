(function(){
    angular
        .module("PlaceConnect")
        .controller("ShowPlaceController", ShowPlaceController);

    function ShowPlaceController($location, $rootScope, $routeParams, PlaceService) {
        var vm = this;
        vm.fid = $routeParams.placeId;
        var mapurl = "https://maps.googleapis.com/maps/api/staticmap?center=LNL&zoom=15&size=500x300&sensor=false&markers=color:red%7Clabel:P%7CLNL"
        
        function init(){
            PlaceService
                .findPlaceByFid(vm.fid)
                .then(function (response) {
                    vm.place = augmentData(response.data);
                    
                }, function(err){
                    vm.error = "Sorry a problem occurred"
                })
        }
        
        init();
        
        
        function augmentData(place) {
            var latlng = place['lat'] + "," + place['lng'];
            var url = mapurl.replace(/LNL/g, latlng);
            place['map'] = url;

            console.log(place['map']);

            return place;
        }
    }
    
    
})();