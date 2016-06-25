

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


    var model = {
        userModelProject: require("./user/user.model.server.js")(),
        placeModel : require("./place/place.model.server")(),
        bucketModel : require("./bucket/bucket.model.server")(),
        messageModel : require("./message/message.model.server")()
    };

    return model;

};