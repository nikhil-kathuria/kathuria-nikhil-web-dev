module.exports = function(app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    
    function createWebsite(req, res){
        var userId = req.params.userId;
        var website = req.body;
        website['_id'] = new Date().getTime().toString();
        website['developerId'] = userId;

        if (websites.push(website)){
            res.status(201).send(website);
        } else {
            res.status(500).send("Not able to create website");
        }


    }

    function findAllWebsitesForUser(req, res){
        var userId = req.params.userId;
        var result = [];
        for(var idx in websites) {
            if(websites[idx].developerId === userId) {
                result.push(websites[idx]);
            }
        }
        res.json(result);
    }
    function findWebsiteById(req, res){
        var websiteId = req.params.websiteId;
        for (var idx in websites){
            if (websites[idx]._id  === websiteId){
                res.json(websites[idx]);
                return;
            }
        }

    }

    function updateWebsite(req, res){
        var websiteId = req.params.websiteId;
        var website = req.body;
        for (var idx in websites){
            if (websites[idx]._id === websiteId){
                websites[idx] = website;
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Cannot update Website");
    }

    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;
        for (var idx in websites){
            if (websites[idx]._id === websiteId){
                websites.splice(idx, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Cannot Update Website");
    }

};