(function(){
    angular
        .module("PlaceConnect")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {

        var vm = this;
        vm.login = login;

        function login(username, password) {
            if (username && password) {
                UserService
                    .login(username, password)
                    .then(function (response) {
                        var user = response.data;
                        if (user._id) {
                            $location.url("/user");
                        }
                    }, function(err){
                        console.log(err);
                        vm.error = "username or password did not match";
                    });
            } else {
                vm.error = "Both username and password required";
            }
        }
    }
})();