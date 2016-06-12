(function() {
    angular
        .module("jgaDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        var start = -1;
        var end = -1;

        function linker(scope, element, attributes) {
            element.sortable({
                sort: function (event, ui) {
                    start = ui.item.index();
                },
                stop: function (event, ui) {
                    end = ui.item.index();
                    if(start >= end) {
                        start--;
                    }
                    scope.wamSortableCallback({
                        start: start,
                        end: end
                    });
                },
                axis : "y"
            });
        }

        return {
            scope: {
                wamSortableCallback: '&'
            },
            link: linker
        }
    }
})();