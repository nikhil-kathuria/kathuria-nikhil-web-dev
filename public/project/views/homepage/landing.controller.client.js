(function(){
    angular
        .module("PlaceConnect")
        .controller("LandingController", LandingController);

    function LandingController($location, GooglePlaceService) {

        var vm = this;
        vm.places = [];
        
        function currentPlaces(){
            vm.palces = GooglePlaceService.getPlaces();
        }

        currentPlaces();
    }

})();