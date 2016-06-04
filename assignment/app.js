module.exports = function(app) {
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);


    app.get("/say/:something", function (req, res){
       var msg = req.params['something'];
        res.send(msg);
    });
};

