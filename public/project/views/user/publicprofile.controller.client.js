(function(){
    angular
        .module("PlaceConnect")
        .controller("PublicProfileController", PublicProfileController);

    function PublicProfileController(UserService, $rootScope, $routeParams) {
        var vm = this;

        vm.sessionUser = $rootScope.sessionUser;
        vm.userId = $routeParams.userId;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function(response){
                    vm.user = response.data;
                });

        }
        init();

        function sendMessage() {
            if (vm.subject) {
                var message = {
                    fromId: vm.sessionUser._id,
                    toId: vm.user._id,
                    from: vm.sessionUser.username,
                    to: vm.user.username,
                    subject: vm.subject,
                    message: vm.body
                }

            } else {
                vm.error = "Message Subject cannot be blank"
            }
        }

    }

})();