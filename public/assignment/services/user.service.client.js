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
            return user
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
            for(var idx in users) {
                if(users[idx].username === username && users[idx].password === password) {
                    return users[idx];
                }
            }
            return null;
        }

        function findUserById(id) {
            for(var idx in users) {
                if(users[idx]._id === id) {
                    return users[idx];
                }
            }
            return null;
        }

        function findUserByUsername(username){
            for(var idx in users){
                if(users[idx].username === username){
                    return users[idx];
                }
            }
            return null;
        }

    }
})();

