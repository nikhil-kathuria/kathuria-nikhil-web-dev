module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchemaProject = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        moderator:  { type: Boolean, default: false},
        google:{
            token:String,
            id:String
        },
        places: [{type: mongoose.Schema.Types.ObjectId, ref: 'Place'}],
        bucketlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bucketlist'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchemaProject;
};