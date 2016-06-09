module.exports = function(app, models){
    
    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel
            .deleteUser(id)
            .then( function (stats) {
                res.send(200);
            }, 
            function (err) {
                res.status(404).send("Not able to delete user");
            });
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function(stats){
                    res.send(200);
                },
                function(err){
                    res.status(404).send(error);
                }
            )
        
    }

    
    function createUser(req, res){
        var user = req.body;
        userModel
            .findUserByUsername(user.username)
            .then(function (stats) {
                res.status(400).send("Username already exist");
                return;
            });
            

        userModel
            .createUser(user)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(501).send("Not able to create user");
                }
            )
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
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (user._id) {
                        res.json(user);
                    } else {
                        res.status(404).send("User or password did not match");
                    }
                }
            )
    }

    function findUserByUsername(username, res){
        userModel
            .findUserByUsername(username, res)
            .then(
            function (user) {
                res.json(user);
            },
            function(err) {
                res.status(404).send(err);
            }
        )
    } 

    function findUserById(req, res) {
        var userId = req.params.userId;

        userModel.findUserById(userId).then(
            function (user) {
                res.json(user);
            },
            function (err) {
                res.status(404).send(err);
            }
        )
    }

};