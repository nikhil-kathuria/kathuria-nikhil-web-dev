module.exports = function() {

    var mongoose = require('mongoose');
    var WidgetSchema = require("./wideget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };

    return api;

    function reorderWidget(pageId, start, end){
        return Widget.find({"_page" : pageId})
            .then(
                function(widgets) {
                    widgets
                        .forEach(
                            function(widget){
                                if(start < end) {
                                    if (widget.priority > start && widget.priority <= end){
                                        widget.priority--;
                                        widget.save(function(){});

                                    } else if(widget.priority === start) {
                                        widget.priority = end;
                                        widget.save(function(){});
                                    }
                                } else {
                                    if (widget.priority < start && widget.priority >= end) {
                                        widget.priority++;
                                        widget.save(function(){});

                                    } else if (widget.priority === start ){
                                        widget.priority = end;
                                        widget.save(function(){});
                                    }
                                }
                            }
                        );
                },
                function(err) {
                    res.send(404);
                }
            );
    }

    function createWidget(widget) {
        var pageId = widget['_page'];
        return Widget
            .find({_page: pageId})
                .then(function (allwidgets) {
                    widget['priority'] = allwidgets.length;
                    return Widget.create(widget);
                }, function (err) {
                    return null;
                });
    }

    function findAllWidgetsForPage(pageId){
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        delete widget._id;

        return Widget.update({_id: widgetId },{
            $set: widget
        });

    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

};