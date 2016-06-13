(function() {
    angular
        .module("jgaDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        var start = -1;
        var end = -1;

        function linker(scope, element, attributes) {
            element.sortable({
                start: function (event, ui) {
                    start = ui.item.index();
                },
                stop: function (event, ui) {
                    end = ui.item.index();
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