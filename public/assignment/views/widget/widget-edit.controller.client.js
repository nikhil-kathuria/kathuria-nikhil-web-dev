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

        vm.deleteWidget = deleteWidget;
        vm.updateHeading =  updateHeading;
        vm.updateYoutube = updateYoutube;
        vm.updateImage = updateImage;

        function init(){
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (resposne) {
                    vm.widget = resposne.data;
                }, function(err){
                    vm.error = err.data;
                });

        }

        init();

        function updateHeading(widget) {
            if (widget.text && widget.size) {
                widget['size'] = parseInt(widget['size']);

                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }, function (err) {
                        vm.error = err.data;
                    });

            } else {
                vm.error = "Text or Size cannot be blank";
            }
        }


        function updateYoutube(widget){

            if( widget.url && widget.width) {
                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        $location.url("/user/"+ vm.userId +"/website/"+ vm.websiteId +"/page/"+ vm.pageId +"/widget");
                    }, function (err) {
                        vm.error = err.data;
                    });

            } else {
                vm.error = "Url or Width cannot be blank";
            }

        }

        function updateImage(widget){

            if( widget.url && widget.width) {
                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        $location.url("/user/"+ vm.userId +"/website/"+ vm.websiteId +"/page/"+ vm.pageId +"/widget");
                    }, function (err) {
                        vm.error = err.data;
                    });
            } else {
                vm.error = "Url or Width cannot be blank";
            }
        }
        
        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function (response) {
                    $location.url("/user/"+ vm.userId +"/website/"+ vm.websiteId +"/page/"+ vm.pageId +"/widget");
                }, function (err){
                    vm.error = err.data;
                });


        }
    }

})();