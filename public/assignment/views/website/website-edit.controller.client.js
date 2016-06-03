(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init(){
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (response){
                    vm.website = response.data;
            });
        }

        init();

        function updateWebsite(website) {
            if (website.name) {
                var website = {
                    "_id": vm.websiteId,
                    "name": vm.website.name,
                    "developerId": vm.userId,
                    "description": vm.website.description
                };
                
                WebsiteService
                    .updateWebsite(vm.websiteId, website)
                    .then(function (response) {
                            $location.url("/user/" + vm.userId + "/website");
                    }, function(err){
                        vm.error=err.data;
                    });

            } else {
                vm.error = "New Website name cannot be blank";
            }
        }

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function (response) {
                    $location.url("/user/"+vm.userId+"/website");
                }, function(err){
                    vm.error = "Unable to delete website";
                });
        }
    }
})();