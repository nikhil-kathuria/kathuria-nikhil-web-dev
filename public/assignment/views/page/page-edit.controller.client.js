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
            PageService
                .findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = angular.copy(response.data);
                });
        }

        init();

        function updatePage(){
            if (vm.page.name){
                PageService
                    .updatePage(vm.pageId, vm.page)
                    .then(function (response) {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    }, function(err){
                        vm.error = err.data;
                    });

            } else {
                vm.error = "Page name cannot be blank";
            }
        }


        function deletePage(){
            PageService
                .deletePage(vm.pageId)
                .then(function (response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                }, function(err){
                    vm.error = err.data;
                });

        }
    }

})();