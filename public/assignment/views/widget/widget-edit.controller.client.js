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
        vm.updateHTML = updateHTML;
        vm.updateTextInput =updateTextInput;

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

        function updateTextInput(widget) {
            if (widget.text && widget.placeholder) {
                if (isNaN(widget.rows) || parseInt(widget.rows) < 1) {
                    widget.rows = 1;
                } else {
                    widget.rows = parseInt(widget.rows);
                }

                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }, function (err) {
                        vm.error = err.data;
                    });

            } else {
                vm.error = "Text or Placeholder cannot be blank";
            }
        }


        function updateHTML(widget){
            if (widget.name && widget.text) {

                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }, function (err) {
                        vm.error = err.data;
                    });

            } else {
                vm.error = "Name or Text cannot be blank";
            }

        }

        function updateHeading(widget) {
            if (widget.text && widget.size && widget.name) {
                widget['size'] = parseInt(widget['size']);

                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    }, function (err) {
                        vm.error = err.data;
                    });

            } else {
                vm.error = "Name or Text or Size cannot be blank";
            }
        }


        function updateYoutube(widget){

            if( widget.url && widget.width && widget.name) {
                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        $location.url("/user/"+ vm.userId +"/website/"+ vm.websiteId +"/page/"+ vm.pageId +"/widget");
                    }, function (err) {
                        vm.error = err.data;
                    });

            } else {
                vm.error = "Name or Url or Width cannot be blank";
            }

        }

        function updateImage(widget){

            if( widget.url && widget.width && widget.name) {
                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(function (response) {
                        $location.url("/user/"+ vm.userId +"/website/"+ vm.websiteId +"/page/"+ vm.pageId +"/widget");
                    }, function (err) {
                        vm.error = err.data;
                    });
            } else {
                vm.error = "Name or Url or Width cannot be blank";
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