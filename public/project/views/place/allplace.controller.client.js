(function(){
    angular
        .module("PlaceConnect")
        .controller("AllPlaceController", AllPlaceController);

    function AllPlaceController($location, $rootScope, PlaceService, $routeParams){
        var vm = this;
        vm.sessionUser = $rootScope.currentUser;
        vm.sessionUser ? vm.userId = vm.sessionUser._id : $location.url("/login");
        vm.sessionUser.moderator ? vm.places = null : $location.url("/user");

        function init() {
            PlaceService.
                findAllPlaces()
                .then(function (places) {
                    vm.places = places.data;
                }, function (err) {
                    vm.error = "No places to review"
                });

        }

        init();
    }

})();