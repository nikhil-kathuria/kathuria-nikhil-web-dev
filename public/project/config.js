(function(){
    angular
        .module("PlaceConnect")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                redirectTo: "/landing"
            })
            .when("/landing", {
                templateUrl: "views/homepage/landing.view.client.html",
                controller: "LandingController",
                controllerAs: "model"
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
            }).when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            }).when("/user/:userId/place", {
                templateUrl: "views/place/place.view.client.html",
                controller: "PlaceController",
                controllerAs: "model"
            })
            .when("/user/:userId/bucket", {
                templateUrl: "views/bucket/bucket.view.client.html",
                controller: "BucketController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/landing"
        });


        function checkLoggedIn(UserService, $location, $q, $rootScope) {
            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then( function (response) {
                        var user = response.data;
                        if (user){
                            console.log(user);
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        } else {
                            console.log(user);
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        }
                    },
                    function (err) {
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }
    }
})();