module.exports = function(app) {
    var userService = require("./services/user.service.server.js")(app);


    app.get("/say/:something", function (req, res){
       var msg = req.params['something'];
        res.send(msg);
    });
};

