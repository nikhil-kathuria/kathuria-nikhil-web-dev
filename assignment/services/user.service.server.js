module.exports = function(app){

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


    function deleteUser(req, res) {
        var id = req.params.userId;
        for(var idx in users) {
            if (users[idx]._id === id) {
                users.splice(idx, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        for(var idx in users) {
            if(users[idx]._id === id) {
                users[idx].firstName = newUser.firstName;
                users[idx].lastName = newUser.lastName;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    
    function createUser(req, res){
        var user = req.body;
        for (var idx in users){
            if (users[idx].username === user.username){
                res.status(400).send("Username already exist");
                return;
            }
        }

        user['_id'] = new Date().getTime().toString();
        if (users.push(user)){
            res.status(200).send(user);
        } else {
            res.status(500).send("Not able to create user");
        }
    }



    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        if (username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }

    function findUserByCredentials(username, password, res ){
        for (var idx in users){
            if (users[idx].username === username && users[idx].password === password){
                res.send(users[idx]);
                return;
            }
        }
        res.send({});
    }

    function findUserByUsername(username, res){
        for (var idx in users){
            if (users[idx].username === username){
                res.send(users[idx]);
                return;
            }
        }
        res.send({});
    } 

    function findUserById(req, res) {
        var id = req.params.userId;

            for (var idx in users) {
                if (users[idx]._id === id) {
                    res.send(users[idx]);
                    return;
                }
            }
            res.send({});
        }

};