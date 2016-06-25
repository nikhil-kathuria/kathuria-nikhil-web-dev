module.exports = function() {

    var mongoose = require('mongoose');
    var MessageSchema = require("./message.schema.server.js")();
    var Message = mongoose.model("Message", MessageSchema);

    var api = {
        insertMessage:insertMessage,
        deleteMessage:deleteMessage,
        getMessages:getMessages
    };

    return api;

    function insertMessage(message) {
        return Message.create(message);

    }

    function deleteMessage(messageId) {
        return Message.remove({_id : messageId});
    }
    
    function getMessages(id){
        return Message.find({toId: id});
    }

};