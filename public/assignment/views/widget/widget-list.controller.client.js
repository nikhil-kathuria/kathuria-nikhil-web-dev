(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;


        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.reorderWidget = reorderWidget;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                vm.widgets = angular.copy(response.data);
                    //$(".container")
                        //.sortable({axis : "y"});
            });
            
        }
        init();

        function reorderWidget(start, end) {
            console.log(start);
            console.log(end);
            WidgetService
                .reorderWidget(vm.pageId, start, end)
                .then(
                    function (response) {
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
    


    function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }
    }
})();