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
            vm.page = angular.copy(PageService.findPageById(vm.pageId));
        }

        init();

        function updatePage(){
            if (vm.page.name){
                //console.log(pageId);
                var result = PageService.updatePage(vm.pageId, vm.page);

                if(result) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                } else {
                    vm.error = "Cannot update the page";
                }

            } else {
                vm.error = "Page name cannot be blank";
            }
        }


        function deletePage(){
            var result = PageService.deletePage(vm.pageId);
            if (result) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            } else {
                vm.error = "Cannot delete the page";
            }
        }
    }

})();