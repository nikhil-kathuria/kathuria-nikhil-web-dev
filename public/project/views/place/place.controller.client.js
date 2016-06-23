(function(){
    angular
        .module("PlaceConnect")
        .controller("PlaceController", PlaceController);
    
    function PlaceController($location, $rootScope, PlaceService){
        var vm = this;
        vm.places = null;
        vm.userId = $rootScope.currentUser._id;
        
        function init() {
            vm.places = PlaceService.findUserPlaces(vm.userId);
        }
    }

})();