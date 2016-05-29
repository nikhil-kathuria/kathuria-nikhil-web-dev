(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function WidgetService() {
        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            createWidget : createWidget,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };
        return api;


        function createWidget(pageId, widget){
            widget['pageId'] = pageId;
            widgets.push(widget);
            //console.log(widgets);
            return widget;

        }

        function findWidgetsByPageId(pageId){
            var resultSet = [];
            for(idx in widgets){
                if (widgets[idx].pageId === pageId) {
                    resultSet.push(widgets[idx]);
                }
            }
            return resultSet;

        }

        function findWidgetById(widgetId){
            for(idx in widgets){
                if(widgets[idx]._id == widgetId){
                    return widgets[idx];
                }
            }
            console.log(widgets)
            return null;
        }

        function updateWidget(widgetId, widget){
            widget['id'] = widgetId;
            for (var idx in widgets){
                if (widgets[idx]._id==widgetId){
                    widgets[idx] = widget;
                }
            }
            return widget;

        }

        function deleteWidget(widgetId){
            for (idx in widgets){
                if(widgets[idx]._id == widgetId){
                    widgets.splice(idx,1);
                    return true;
                }
            }
            return false;
        }
    }
})();