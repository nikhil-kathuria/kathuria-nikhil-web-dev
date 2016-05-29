(function(){
    angular
        .module("WebAppMaker")
        .controller("ChooseWidgetController", ChooseWidgetController);

    function ChooseWidgetController($location, $routeParams, WidgetService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.addWidget = addWidget;

        function addWidget(widgetType){
            var widget = {
                widgetType : widgetType,
                _id : (new Date()).getTime().toString()
            };

            var result = WidgetService.createWidget(vm.pageId, widget);

            if (result) {
                $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/" + vm.pageId + "/widget/" + widget._id);

            } else {
                vm.error = "New Widget could not be created";
            }
        }

    }

})();