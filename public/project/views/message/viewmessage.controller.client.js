(function(){
    angular
        .module("PlaceConnect")
        .controller("ViewMessageController", ViewMessageController);
    
    function ViewMessageController($routeParams, $location, MessageService){
        var vm = this;
        vm.userId = $routeParams.userId;

        function init(){
            MessageService.
            getMessages(vm.userId)
                .then(function (response) {
                    vm.messages = response.data;
                    console.log(vm.messages);
                }, function (err){
                    vm.error = "Sorry no messages found";
                });

        }

        init();
    }

})();