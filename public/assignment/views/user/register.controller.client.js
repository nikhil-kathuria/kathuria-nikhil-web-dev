(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {

        var vm = this;
        vm.register = register;



        function register(username, password1, password2) {
            if (username==null || username==""){
                vm.error = "Username cannot be blank";

            } else if  (password1 !== password2) {
                vm.error = "Passwords do not match";

            } else if (password1==null || password1==""){
                vm.error = "Password cannot be blank";

            } else {
                
                found = UserService.findUserByUsername(username);

                if (found){
                    vm.error ="User Name already exist"

                } else {
                    var user = {};
                    user._id = new Date().getTime().toString();
                    user.username = username;
                    user.password = password1;

                    created = UserService.createUser(user);
                    console.log(created);

                    if(created) {
                        $location.url("/user/" + user._id);
                    } else {
                        vm.error ="Unable to create user"
                    }
                }
            }
        }

    }
})();