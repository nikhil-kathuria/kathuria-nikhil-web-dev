(function () {
    angular
        .module("PlaceConnect")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            registerUser: registerUser,
            createUser: createUser,
            login:login,
            logout:logout,
            loggedIn: loggedIn,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername : findUserByUsername
        };
        return api;

        function logout(){
            return $http.post("/api/logout");
        }

        function loggedIn(){
            return $http.get("/api/loggedIn");
        }


        function login(username, password){
            var user = {
                username: username,
                password: password
            };
            console.log(user);
            return $http.post("/api/login",user);

        }

        function registerUser(username, password) {
            var user = {};
            user['username'] = username;
            user['password'] = password;

            return $http.post("/api/register", user);
        }

        function createUser(username, password) {
            var user = {};
            user['username'] = username;
            user['password'] = password;

            return $http.post("/api/user", user);
        }


        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/user/" + id;
            return $http.put(url, newUser);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);

        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function findUserByUsername(username){
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

    }
})();

