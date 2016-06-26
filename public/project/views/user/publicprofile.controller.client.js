(function(){
    angular
        .module("PlaceConnect")
        .controller("PublicProfileController", PublicProfileController);

    function PublicProfileController(UserService, $rootScope, $routeParams, MessageService) {
        var vm = this;

        vm.sendMessage = sendMessage;
        vm.sessionUser = $rootScope.sessionUser;
        console.log(vm.sessionUser);
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
                };

                MessageService
                    .insertMessage(message)
                    .then(function (response) {
                        vm.success = "Message posted Successfully";
                    }, function (err){
                        vm.error = "Some error occurred";
                    });

            } else {
                vm.error = "Message Subject cannot be blank"
            }
        }

    }

})();