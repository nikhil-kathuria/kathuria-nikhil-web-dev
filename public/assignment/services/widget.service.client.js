(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            createWidget : createWidget,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
            reorderWidget: reorderWidget
        };
        return api;


        function reorderWidget(pageId, startIndex, endIndex) {
            return $http.put("/page/"+pageId+"/widget?start="+startIndex+"&end="+endIndex);
        }

        function createWidget(pageId, widget){
            return $http.post("/api/page/" + pageId + "/widget", widget);

        }

        function findWidgetsByPageId(pageId){
            return $http.get("/api/page/" + pageId + "/widget");

        }

        function findWidgetById(widgetId){
            return $http.get("/api/widget/" + widgetId);
        }

        function updateWidget(widgetId, widget){
            return $http.put("/api/widget/" + widgetId, widget);

        }

        function deleteWidget(widgetId){
            return $http.delete("/api/widget/" + widgetId);
        }
    }
})();