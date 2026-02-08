const Post = require("../../models/post.model");
const dateHelper = require("../../helpers/formattedDate.helper")
const Tag = require("../../models/tag.model")
const tagHelper = require("../../helpers/colorTag.helper")

module.exports.index = async (req, res) => {
    let find = {
        status: "published",
        deleted: false
    }

    let posts = await Post.find(find)
        .sort({ publishedAt: -1 })
        .limit(4)
        .lean();

    posts = await dateHelper.formattedDate(posts);
    posts = await tagHelper.addTagColor(posts)
    
    
    //all blog + phan trang
    let objectPagination = {
        limitItems: 6,
        currentPage: parseInt(req.query.page) || 1,  
    }
    
    let countPosts = await Post.countDocuments(find)
    let skip = objectPagination.limitItems * (objectPagination.currentPage - 1);
    let totalPage = Math.ceil(countPosts/objectPagination.limitItems);

    objectPagination.skip = skip;
    objectPagination.totalPage = totalPage;

    let allPosts = await Post.find(find).lean().limit(objectPagination.limitItems).skip(objectPagination.skip);

    allPosts = await dateHelper.formattedDate(allPosts);
    allPosts = await tagHelper.addTagColor(allPosts);


    if(req.xhr){
        return res.json({
            allPosts,
            objectPagination
        })
    }
    
    res.render("client/pages/home", {
        layout: "client/layouts/default", posts, allPosts, objectPagination
    })
}

module.exports.about = async (req, res) => {
    res.send("OK")
}
