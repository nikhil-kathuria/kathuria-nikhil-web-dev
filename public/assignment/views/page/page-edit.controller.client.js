(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.page = PageService.findPageById(pageId);
        }

        init();

        function updatePage(pageId){
            page = {"_id" : pageId,
                    "name" : vm.page.name,
                    "websiteID" : vm.websiteId,
                    "description" : vm.page.description
            };
            var result = PageService.updatePage(pageId, page);

            if(result) {
                $location.route("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            } else {
                vm.error = "Cannot update the page";
            }
        }

        function deleltePage(pageId){
            var result = PageService.deleltePage(pageId);
            if (result) {
                $location.route("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            } else {
                vm.error = "Cannot delete the page";
            }
        }
    }

})();