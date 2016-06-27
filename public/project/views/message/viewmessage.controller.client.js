(function(){
    angular
        .module("PlaceConnect")
        .controller("ViewMessageController", ViewMessageController);
    
    function ViewMessageController($routeParams, $location, MessageService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.deleteMessage = deleteMessage;

        function init(){
            MessageService.
            getMessages(vm.userId)
                .then(function (response) {
                    vm.messages = response.data;
                    console.log(vm.messages);
                }, function (err){
                    vm.info = "Sorry No messages found";
                });

        }

        init();

        function deleteMessage(messageId) {
            MessageService
                .deleteMessage(messageId)
                .then(function (response) {
                    init();
                }, function (err) {
                   vm.error = "Could not delete"
                });

        }
    }

})();