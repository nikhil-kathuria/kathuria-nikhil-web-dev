(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {

        var vm = this;
        vm.login = login;

        function login (username, password1, password2) {
            if  (password1 !== password2) {
                vm.error = "Passwords do not match";
            }

            found = UserService.findUserByUsername(username);

            if (found){
                vm.error ="User Id already exist"
            } else {
                user._id = new Date().getTime().toString();
                user.uusername = username;
                UserService.createUser(user);
                $location.url("/profile/" + user._id);
            }
        }

    }
})();