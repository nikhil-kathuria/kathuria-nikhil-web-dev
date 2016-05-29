
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            if (!(name)) {
                vm.error = "New website name cannot be blank"
                
            } else {
                var mywebsite = {
                    name: name,
                    description: description,
                };
                var newWebsite = WebsiteService.createWebsite(vm.userId, mywebsite);
                if (newWebsite) {
                    $location.url("/user/" + vm.userId + "/website");
                } else {
                    vm.error = "Unable to create website";
                }
            }
        }
    }
})();