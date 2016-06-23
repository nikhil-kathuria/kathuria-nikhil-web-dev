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
            vm.places = PlaceService.findUserPlaces(vm.userId);
        }
        init();
    }

})();