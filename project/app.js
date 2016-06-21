module.exports = function(app) {

    // Project related imports
    var modelproject = require("./models/models.project.server");

    require("./services/user.service.server")(app, modelproject);

};