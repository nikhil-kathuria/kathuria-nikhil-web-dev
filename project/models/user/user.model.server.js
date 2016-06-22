
module.exports = function() {

    var mongoose = require('mongoose');
    var UserSchemaProject = require("./user.schema.server.js")();
    var UserProject = mongoose.model("UserProject", UserSchemaProject);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId : findUserByGoogleId,
        updateProfilePic: updateProfilePic,
    };
    return api;


    function updateUser(userId, user) {
        delete user._id;
        return UserProject
            .update({_id: userId },{
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
    }
    
    function updateProfilePic(userId, picurl){
        return UserProject
            .update({_id: userId },{
                $set: {
                    pic: picurl
                }
            });
    }

    function deleteUser(userId) {
        return UserProject.remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return UserProject.findOne({username: username, password: password});
    }

    function findUserById(userId) {
        return UserProject.findById(userId);
    }

    function findUserByUsername(username){
        return UserProject.findOne({username: username});
    }

    function createUser(user) {
        return UserProject.create(user);
    }

    function findUserByFacebookId(facebookId) {
        return UserProject.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserProject.findOne({'google.id': googleId});
    }
};