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
            vm.website =  angular.copy(WebsiteService.findWebsiteById(vm.websiteId));
        }

        init();

        function updateWebsite(website) {
            if (!(website.name)) {
                vm.error = "New Website name cannot be blank"

            } else {
                website = {
                    "_id": vm.websiteId,
                    "name": vm.website.name,
                    "developerId": vm.userId,
                    "description": vm.website.description
                };
                var result = WebsiteService.updateWebsite(vm.websiteId, website);
                console.log(result);

                if (result) {
                    $location.url("/user/" + vm.userId + "/website");
                } else {
                    vm.error = "Cannot update the page";
                }
            }
        }

        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to delete website";
            }
        }
    }
})();