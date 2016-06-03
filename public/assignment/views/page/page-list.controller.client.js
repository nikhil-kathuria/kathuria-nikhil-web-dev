(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);
    
    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;

        function init(){
            PageService
                .findPageByWebsite(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                });
        }

        init();
    }

})();