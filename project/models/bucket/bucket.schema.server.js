module.exports = function() {
    var mongoose = require("mongoose");

    var BucketSchema = mongoose.Schema({
        name: String,
        createdBy: String,
        type: String,
        places : [{ type : String}],
        dateAdded: {type: Date, default: Date.now}
    }, {collection: "project.bucket"});

    return BucketSchema;
};