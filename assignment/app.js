module.exports = function(app) {

    var models = require("./models/models.server")();

    require("./services/user.service.server.js")(app, models);
    require("./services/website.service.server.js")(app, models);
    require("./services/page.service.server.js")(app, models);
    require("./services/widget.service.server.js")(app,models);


    app.get("/say/:something", function (req, res){
       var msg = req.params['something'];
        res.send(msg);
    });
};

