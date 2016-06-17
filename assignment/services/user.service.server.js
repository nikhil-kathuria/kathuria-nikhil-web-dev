var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app, models){
    
    var userModel = models.userModel;

    app.get("/auth/facebook", passport.authenticate('facebook'));
    app.get("/auth/facebook/callback", passport.authenticate('facebook', {
        successRedirect: '/assignment/#/user',
        failureRedirect: '/assignment/#/login'
    }));
    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/register", register);
    app.post("/api/logout", logout);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    passport.use('wam',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

//    passport.use(new FacebookStrategy(facebookConfig, facebookLogin));

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }
    
    function loggedIn(req, res) {
        if(req.isauthenticated()){
            res.json(req.user);
        } else {
            res.send(false);
        }
    }

    function login(req,res){
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.sen(200);
    }

    function facebookLogin(token, refreshToken, profile, done) {
        res.send(200);
        userModel
            .findFacebook(profile.id)
            .then(function (facebookuser) {
            return done(null, facebookuser);
            
        });
    }
    
    function register(req, res){
        var username = req.body.username;
        var password = req.body.password;
        
        userModel
            .findUserByUsername(username)
            .then( function (user) {
                if(user){
                    res.status(400).send("Username already exist");
                    return;
                } else {
                    req.body.password = bcrypt.hashSync(req.body.password);
                    return userModel
                        .createUser(req.body.username, req.body.password);
                }
            }, function (err) {
                res.status(400).send(err);
            }
            ).then(function ( user) {
                if (user) {
                    req.login(user,  function (err) {
                        if(err){
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }



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
                if(stats.length !== 0){
                    res.status(400).send("Username already exist");
                }
                else {
                    userModel
                        .createUser(user)
                        .then(
                            function (user) {
                                res.json(user);
                            },
                            function (error) {
                                res.statusCode(400).send("Not able to create user");
                            });
                }
            });
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
                    if (user) {
                        res.json(user);
                    } else{
                        res.status(404).send("User or password did not match");
                    }
                }, function (err) {
                    res.status(501).send(err);
                }
            );
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
        );
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
        );
    }

};