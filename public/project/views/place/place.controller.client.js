(function(){
    angular
        .module("PlaceConnect")
        .controller("PlaceController", PlaceController);
    
    function PlaceController($location, $rootScope, PlaceService, $routeParams){
        var vm = this;
        vm.places = null;
        //vm.userId = $rootScope.currentUser._id;
        vm.userId = $routeParams.userId;
        
        function init() {
            PlaceService.
            findUserPlaces(vm.userId)
                .then(function (places) {
                    vm.places = places.data;
                }, function (err) {
                    vm.error = "No places found. Add them by Clicking Top-Left"
                });
            
        }
        init();
    }

})();