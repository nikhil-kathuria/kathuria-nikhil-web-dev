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

                PageService
                    .createPage(vm.websiteId, page)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }, function(err){
                        vm.error = err.data;
                    });
            } else {
                vm.error = "New page name cannot be blank";
            }
        }
    }

})();