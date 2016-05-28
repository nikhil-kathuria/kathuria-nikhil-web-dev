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
            vm.website =  WebsiteService.findWebsiteById(vm.websiteId)
        }

        init();

        function updateWebsite(websiteId){
            website = {"_id" : websiteId,
                "name" : vm.website.name,
                "websiteID" : vm.websiteId,
                "description" : vm.website.description
            };
            var result = WebsiteService.updateWebsite(website, websiteId);

            if(result) {
                $location.route("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Cannot update the page";
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