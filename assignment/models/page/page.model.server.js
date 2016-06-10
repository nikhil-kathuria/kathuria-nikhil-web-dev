module.exports = function() {

    var mongoose = require('mongoose');
    var PageSchema = require("./page.schema.server.js")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage :  updatePage,
        deletePage: deletePage
    };
    return api;


    function createPage(page) {
        return Page.create(page);
    }

    function findAllPagesForWebsite(websitId) {
        return Page.find({_website : websitId});
    }

    function  findPageById(pageId) {
        return Page.findById(pageId);
    }

    function updatePage(pageId, page) {
        delete page._id;
        return Page.update({_id: pageId },{
            $set: {
                name: page.name,
                title: page.title
            }
        });
    }

    function deletePage(pageId) {
        return Page.remove({_id : pageId});
    }
};

