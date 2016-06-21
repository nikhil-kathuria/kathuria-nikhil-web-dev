

module.exports = function() {
    var connectionString = 'mongodb://localhost/cs5610project';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);


    var projectmodels = {
        userModelProject: require("./user/user.model.server")()
        //websiteModel: require("./website/website.model.server.js")(),
        //pageModel: require("./page/page.model.server")(),
        //widgetModel: require("./widget/widget.model.server")()
    };

    return projectmodels;

};