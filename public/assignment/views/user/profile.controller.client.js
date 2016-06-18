(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;
        vm.userId = $rootScope.currentUser._id;

        
        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function(response){
                    vm.user = response.data;
            });

        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function(response){
                        $location.url("/login");
                    },
                    function() {
                        $location.url("/login");
                    }
                )
        }
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
                    }, function(err){
                        vm.error = err.data;
                    }
                )
        }
    }
})();