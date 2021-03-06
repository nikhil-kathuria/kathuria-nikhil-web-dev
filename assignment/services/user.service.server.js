var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

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
    app.post("/api/login", passport.authenticate('WAM'), login);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    passport.use('WAM', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));

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

    function facebookLogin(token, refreshToken, profile, done) {
        console.log(profile);
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(facebookUser) {
                    if(facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    done(null, user);
                                }
                            );
                    }
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
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
        if(req.isAuthenticated()){
            res.json(req.user);
        } else {
            res.send(false);
        }
    }

    function login(req, res){
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
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
                    password = bcrypt.hashSync(req.body.password);
                    return userModel
                        .createUser({username: username, password: password});
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