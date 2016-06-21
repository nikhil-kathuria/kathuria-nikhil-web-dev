(function(){
    angular
        .module("PlaceConnect")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {

        var vm = this;
        vm.register = register;


        function register(username, password1, password2) {
            if (username) {

                if (password1 && password2) {

                    if (password1 === password2) {

                        UserService
                                .registerUser(username, password1)
                                .then(function(response){
                                    var user = response.data;
                                    console.log(user);
                                    if (user._id) {
                                        $location.url("/user/");
                                    }
                                }, function (response) {
                                    vm.error = response.data;
                                });

                    } else {
                        vm.error = "Passwords do not match";
                    }
                    
                } else {
                    vm.error = "Password cannot be blank";
                }
                
            } else {
                vm.error = "Username cannot be blank";
            }
        }
    }
    
})();