(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);
    
    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;

        function init(){
            vm.pages = PageService.findPageByWebsite(vm.websiteId);
        }

        init();
    }

})();