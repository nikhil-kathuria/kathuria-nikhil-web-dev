(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService(){

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

        var api = {
            createPage: createPage,
            findPageByWebsite: findPageByWebsite,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        return api;


        function createPage(websiteId, page) {
            page['websiteId'] = websiteId;
            page['_id'] = (new Date()).getTime().toString();
            pages.push(page);
            return page;
        }

        function findPageByWebsite(websiteId) {
            var resultSet = [];
            for (var idx in  pages) {
                if (pages[idx].websiteId === websiteId) {
                    resultSet.push(pages[idx]);
                }
            }
            return resultSet;
        }

        function findPageById(pageId) {
            for (var idx in  pages) {
                if (pages[idx]._id === pageId) {
                    return pages[idx];
                }
            }
            return null;

        }

        function updatePage(pageId, page) {
            for (var idx in pages) {
                if (pages[idx]._id === pageId) {
                    pages[idx] = page;
                    return page;
                }
            }
            return null;

        }

        function deletePage(pageId) {
            for (var idx in pages) {
                if (pages[idx]._id === pageId) {
                    pages.splice(idx, 1);
                    return true;
                }
            }
            return false;
        }
    }

})();