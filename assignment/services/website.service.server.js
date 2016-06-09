module.exports = function(app, models) {

    var websiteModel = models.websiteModel;

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    
    function createWebsite(req, res){
        var userId = req.params.userId;
        var website = req.body;

        websiteModel
            .createWebsiteForUser(userId, website)
            .then(function (website) {
                res.json(website);
        }, function (error){
                res.status(400).send("Not able to create website");
            });

    }

    function findAllWebsitesForUser(req, res){
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (website){
                res.json(website);
        }, function (err) {
                res.status(404).send("No website found");
            })
      
    }
    function findWebsiteById(req, res){
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
            return res.json(website)
        }, function(err){
                res.status(404).send(err);
            });

    }

    function updateWebsite(req, res){
        var websiteId = req.params.websiteId;
        var website = req.body;
        websiteModel
            .updateWebsite(websiteId, website)
            .then(function (response) {
                res.send(200);
            }, function (err) {
                res.status(400).send("Cannot update Website");
            });
    }

    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (response) {
                res.send(200)
        }, function(err){
                res.status(400).send("Cannot delete Website");
            });

    }

};