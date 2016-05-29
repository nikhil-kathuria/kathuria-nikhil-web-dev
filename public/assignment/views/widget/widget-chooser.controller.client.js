(function(){
    angular
        .module("WebAppMaker")
        .controller("ChooseWidgetController", ChooseWidgetController);

    function ChooseWidgetController($routeParams, WidgetService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.editWidget = editWidget;

        function editWidget(widgetType){

        }

    }

})();