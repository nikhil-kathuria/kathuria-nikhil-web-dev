(function(){
    angular
        .module("PlaceConnect")
        .controller("LandingController", LandingController);

    function LandingController($location, GooglePlaceService) {

        var vm = this;
        vm.currentPlaces = currentPlaces;
        vm.places = [];
        
        function currentPlaces(){
            GooglePlaceService
                .getPlaces()
                .then(function (response) {
                    vm.places = response;
                    console.log(vm.places);
                });
        }

        currentPlaces();
    }

})();