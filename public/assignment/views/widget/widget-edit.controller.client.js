(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($location, $routeParams, WidgetService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;
        
        vm.updateWidget =  updateWidget;
        vm.deleteWidget = deleteWidget;

        function init(){
            vm.widget = angular.copy(WidgetService.findWidgetById(vm.widgetId));
            console.log(vm.widget);
        }

        init();
        
        function updateWidget(widget){
            var result = WidgetService.updateWidget(vm.widgetId, widget);

            if (result){
                $location.url("/user/"+ vm.userId +"/website/"+ vm.websiteId +"/page/"+ vm.pageId +"/widget");
            } else {
                vm.error = "Failed to update the widget"
            }
        }
        
        function deleteWidget() {
            var result = WidgetService.deleteWidget(vm.widgetId);

            if (result) {
                $location.url("/user/"+ vm.userId +"/website/"+ vm.websiteId +"/page/"+ vm.pageId +"/widget");

            } else {
                vm.error = "Failed to delete the widget";
            }
        }
    }

})();