(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.userId = $routeParams.userId;

        
        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function(response){
                    vm.user = response.data;
            });

        }
        init();

        function updateUser() {
            UserService
                .updateUser(vm.userId, vm.user)
                .then(
                    function(response){
                        vm.success = "User successfully updated";
                    }, function(error){
                        vm.error = "Could not update profile";
                    }
                );
        }

        function unregister(){
            UserService
                .deleteUser(vm.userId)
                .then(
                    function () {
                        $location.url("/login");
                    }, function(){
                        vm.error = "Unable to remove user";
                    }
                )
        }
    }
})();