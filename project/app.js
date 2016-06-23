module.exports = function(app) {

    // Project related imports
    var models = require("./models/models.project.server")();

    require("./services/user.service.server")(app, models);
    require("./services/place.service.server")(app, models);
    

};