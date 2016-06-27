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
            })
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId", {
                templateUrl: "views/user/publicprofile.view.client.html",
                controller: "PublicProfileController",
                controllerAs: "model",
                resolve: {
                    getSessionUser: getSessionUser
                }
            })
            .when("/user/:userId/place", {
                templateUrl: "views/place/place.view.client.html",
                controller: "PlaceController",
                controllerAs: "model"
            })
            .when("/user/:userId/place/add", {
                templateUrl: "views/place/addplace.view.client.html",
                controller: "AddPlaceController",
                controllerAs: "model"
            })
            .when("/user/:userId/place/:placeId", {
                templateUrl: "views/place/showplace.view.client.html",
                controller: "ShowPlaceController",
                controllerAs: "model",
                resolve: {
                    getSessionUser: getSessionUser
                }
            })
            .when("/user/:userId/similar", {
                templateUrl: "views/place/commonplace.view.client.html",
                controller: "SimilarUsersController",
                controllerAs: "model"
            })
            .when("/user/:userId/bucket", {
                templateUrl: "views/bucket/bucket.view.client.html",
                controller: "BucketController",
                controllerAs: "model"
            })
            .when("/user/:userId/message", {
                templateUrl: "views/message/viewmessage.view.client.html",
                controller: "ViewMessageController",
                controllerAs: "model"
            })
            .when("/user/:userId/allplace", {
                templateUrl: "views/place/allplace.view.client.html",
                controller: "AllPlaceController",
                controllerAs: "model",
                resolve: {
                    getSessionUser: getSessionUser
                }
            })
            .when("/place/:placeId", {
                templateUrl: "views/homepage/publicplace.view.client.html",
                controller: "PublicPlaceController",
                controllerAs: "model",
                resolve: {
                    getSessionUser: getSessionUser
                }
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

        function getSessionUser(UserService, $q, $rootScope) {
            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then(function (response) {
                    var currentUser = response.data;
                    if (currentUser != '0') {
                        $rootScope.sessionUser = currentUser;
                    } else {
                        $rootScope.sessionUser = null;
                    }
                    deferred.resolve();
                });

            return deferred.promise;
        }
    }
})();