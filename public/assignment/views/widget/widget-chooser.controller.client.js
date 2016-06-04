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

        function addWidget(widgetType) {
            var widget = {
                widgetType: widgetType
            };

            WidgetService
                .createWidget(vm.pageId, widget)
                .then(function (response) {
                    var widgetId = response.data._id;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);
                }, function (err) {
                    vm.error = err.data;
                });

        }
    }

})();