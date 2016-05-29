(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.createPage = createPage;

        function createPage(name, title){
            console.log(name);
            if(name){
                var page = {
                    "name" : name,
                    "title" : title
                };

                var result = PageService.createPage(vm.websiteId, page);

                if (result){
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                } else {
                    vm.error = "Cannot create the page";
                }

            } else {
                vm.error = "New page name cannot be blank";
            }
        }
    }

})();