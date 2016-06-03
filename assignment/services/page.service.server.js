module.exports = function(app){

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    

    function createPage(req, res){
        var websiteId = req.params.websiteId;
        var page = req.body;
        
        page['_id'] = new Date().getTime().toString();
        page['websiteId'] = websiteId;
        
        if (pages.push(page)){
            res.sendStatus(201);
        } else {
            res.status(500).send("Not able to create page");
        }
        
    }

    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;
        var result = [];
        for(var idx in pages){
            if (pages[idx].websiteId === websiteId ){
                result.push(pages[idx]);
            }
        }
        res.json(result);
    }

    function findPageById(req, res){
        var pageId = req.params.pageId;
        for(var idx in pages){
            if (pages[idx]._id === pageId ) {
                res.json(pages[idx]);
                return;
            }
        }
        
    }

    function updatePage(req, res){
        var pageId = req.params.pageId;
        var page = req.body;

        for (var idx in pages){
            if (pages[idx]._id === pageId ) {
                pages[idx] = page;
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Cannot update Page");
    }

    function deletePage(req, res){
        var pageId = req.params.pageId;
        for (var idx in pages){
            if (pages[idx]._id === pageId){
                pages.splice(idx, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Cannot delete Page");

    }
};