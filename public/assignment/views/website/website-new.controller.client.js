
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            if (name) {
                var mywebsite = {
                    name: name,
                    description: description
                };

                WebsiteService
                    .createWebsite(vm.userId, mywebsite)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website");
                }, function(err){
                        vm.error = err.data;
                    });

            } else {
                vm.error = "New website name cannot be blank";
            }
        }
    }
})();