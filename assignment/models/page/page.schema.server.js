
var mongoose = require("mongoose");

module.exports = function() {

    var PageSchema = mongoose.Schema({
        _website: { type: mongoose.Schema.Types.ObjectId, ref: 'Website' },
        name : String,
        title : String,
        description : String,
        widgets: {type: Array, "default": []},
        dateCreated : {type : Date, default: Date.now}
    }, {collection: "assignment.page"});

    return PageSchema;
};