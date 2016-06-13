(function(){
    angular
        .module("PlaceConnect")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                redirectTo: "/login"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            }).otherwise({
                redirectTo: "/login"
            });
    }
})();