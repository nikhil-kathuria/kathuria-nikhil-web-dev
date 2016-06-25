module.exports = function() {
    var mongoose = require("mongoose");

    var MessageSchema = mongoose.Schema({
        fromId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProject'},
        toId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProject'},
        from: String,
        to: String,
        subject: String,
        message: String,
        timestamp: {type: Date, default: Date.now}
        
    },{collection: "project.message"});

    return MessageSchema;
};