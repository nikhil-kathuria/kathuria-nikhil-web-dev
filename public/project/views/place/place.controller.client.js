(function(){
    angular
        .module("PlaceConnect")
        .controller("PlaceController", PlaceController);
    
    function PlaceController($location, $rootScope, PlaceService, UserService, $routeParams){
        var vm = this;
        vm.places = null;
        vm.sessionUser = $rootScope.sessionUser;
        vm.sessionUser ? vm.userId = $routeParams.userId : $location.url("/login");
        vm.sessionUser._id !== vm.userId ? $location.url("/user") : vm.places = null;
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
        
        function deleteUserPlace(fid) {
            UserService
                .deleteUserPlace(fid, vm.userId)
                .then(function (response) {
                init();
            }, function (err) {
                    vm.error = "Failed to delete the place"
                });
            
        }
    }

})();