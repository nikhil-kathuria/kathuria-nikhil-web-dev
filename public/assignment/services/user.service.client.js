(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername : findUserByUsername
        };
        return api;

        function updateUser(id, newUser) {
            for(var idx in users) {
                if(users[idx]._id === id) {
                    users[idx].firstName = newUser.firstName;
                    users[idx].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }

        function createUser(user) {
            users.push(user)
        }

        function deleteUser(id) {
            for (var idx in users) {
                if (users[idx]._id === id) {
                    users.splice(idx, 1)
                    return true;
                }
            }
            return false;
        }

        function findUserByCredentials(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserById(id) {
            for(var i in users) {
                if(users[i]._id === id) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsername(username){
            for(var idx in users){
                if(users[i].username === username){
                    return true
                }
            }
            return false;
        }

    }
})();

