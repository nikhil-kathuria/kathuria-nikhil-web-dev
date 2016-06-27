var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


module.exports = function(app, model){

    var userModelProject = model.userModelProject;
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/register", register);
    app.post("/api/logout", logout);
    app.post("/api/login", passport.authenticate('PC'), login);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/profilepicupload", upload.single('myFile'), uploadProfilePic);




    app.get("/auth/google", passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get("/auth/google/callback",
        passport.authenticate('google', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));

    passport.use('PC',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);



    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    passport.use('google',new GoogleStrategy(googleConfig, googleStrategy));

    function uploadProfilePic(req, res) {
        var myFile = req.file;
        var redirecturl = "/project/#/user";
        var userId = req.body.userId;
        

        if(myFile) {
            var filename = myFile.filename;
            var url = "/uploads/" + filename.toString();
            userModelProject.updateProfilePic(userId, url);
        }
        res.redirect(redirecturl);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModelProject
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

    function googleStrategy(token, refreshToken, profile, done) {
        userModelProject
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    }
                    else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModelProject
                            .createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function localStrategy(username, password, done) {
        userModelProject
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

        userModelProject
            .findUserByUsername(username)
            .then( function (user) {
                    if(user){
                        res.status(400).send("Username already exist");
                        return;
                    } else {
                        password = bcrypt.hashSync(req.body.password);
                        return userModelProject
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
        userModelProject
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
        userModelProject
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
        userModelProject
            .findUserByUsername(user.username)
            .then(function (stats) {
                if(stats.length !== 0){
                    res.status(400).send("Username already exist");
                }
                else {
                    userModelProject
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
        userModelProject
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
        userModelProject
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

        userModelProject.findUserById(userId).then(
            function (user) {
                res.json(user);
            },
            function (err) {
                res.status(404).send(err);
            }
        );
    }
};

