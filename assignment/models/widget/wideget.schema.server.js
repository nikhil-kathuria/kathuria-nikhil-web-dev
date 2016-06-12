var mongoose = require("mongoose");

module.exports = function() {
    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name: {type: String},
        text: {type: String},
        placeholder: {type: String},
        description: {type: String},
        url: {type: String},
        width: {type: String},
        height: {type: String},
        rows: {type: Number},
        size: {type: Number},
        priority: {type: Number},
        class: {type: String},
        icon: {type: String},
        deletable: {type: Boolean},
        formatted: {type: Boolean},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};