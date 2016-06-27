(function(){
    angular
        .module("PlaceConnect")
        .controller("AllPlaceController", AllPlaceController);

    function AllPlaceController($location, $rootScope, PlaceService, $routeParams){
        var vm = this;
        vm.sessionUser = $rootScope.sessionUser;
        vm.sessionUser ? vm.userId = $routeParams.userId : $location.url("/login");
        vm.sessionUser.moderator ? vm.places = null : $location.url("/user");
        vm.sessionUser._id !== vm.userId ? $location.url("/user") : vm.places = null;
        vm.deletePlace = deletePlace;


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

        function deletePlace(fid) {
            PlaceService
                .deletePlace(fid)
                .then(function (response) {
                init();
            }, function (err) {
                    vm.error = "Error Occured";
                });
        }
    }

})();