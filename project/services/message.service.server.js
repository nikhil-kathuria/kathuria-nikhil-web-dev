module.exports = function(app, model){

    var messageModel = model.messageModel;


    app.post("/app/message/post", insertMessage);
    app.get("/app/message/:toId", deleteMessage);
    app.delete("/app/message/:messageId", getMessages);



    function insertMessage(req, res) {
        var message = req.body;
        messageModel
            .insertMessage(message)
            .then(function (response) {
                res.send(200);
            }, function () {
                res.status(501).send("Message not sent")
            });

    }

    function deleteMessage(req, res) {
        var messageId = req.params.messageId;
        messageModel
            .deleteMessage(messageId)
            .then(function (response) {
                res.send(200);
            }, function () {
                res.status(501).send("Could not delete the message")
            });

    }

    function getMessages(req, res) {
        var toId = req.params.toId;

        messageModel
            .getMessages(toId)
            .then( function (messages) {
                res.send(messages);
            }, function (err) {
                res.status(404).send("No Message Found")
            })

    }

};