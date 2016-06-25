(function () {
    angular
        .module("PlaceConnect")
        .factory("MessageService", MessageService);

    function MessageService($http) {
        var api = {
            insertMessage: insertMessage,
            deleteMessage: deleteMessage,
            getMessages: getMessages

        };

        return api;


        function insertMessage(message) {
            return $http.post("/app/message/post", message);
        }

        function deleteMessage(toId) {
            return $http.delete("/app/message/" + toId);
        }

        function getMessages(messageId) {
            return $http.get("/app/message/" + messageId);
        }

    }
    
})();
