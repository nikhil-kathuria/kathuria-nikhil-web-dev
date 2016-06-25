(function(){
    angular
        .module("PlaceConnect")
        .controller("SimilarUsersController", SimilarUsersController);

    function SimilarUsersController($location, $rootScope, $routeParams, PlaceService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        
        function init(){
            PlaceService
                .findSimilarUsers(vm.userId)
                .then(function (response) {
                    vm.data = response.data;
            }, function (err){
                    vm.error = "Sorry no similar users found";
                });
        }
        
        init();
    }

})();