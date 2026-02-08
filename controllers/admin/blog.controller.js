const Post = require("../../models/post.model");
const Tag = require("../../models/tag.model");
const dateHelper = require("../../helpers/formattedDate.helper");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    let keyword = req.query.keyword || "";

    objectPagination = {
        limitItems: 4,
        currentPage: parseInt(req.query.page) || 1,
    }

    if (keyword) {
        find.title = new RegExp(keyword, "i");
        // objectPagination.currentPage = 1;
    }

    let countPost = await Post.countDocuments();
    let skip = objectPagination.limitItems * (objectPagination.currentPage - 1);
    let totalPage = Math.ceil(countPost / objectPagination.limitItems);

    objectPagination.skip = skip;
    objectPagination.totalPage = totalPage;

    let allPost = await Post.find(find).lean().skip(objectPagination.skip).limit(objectPagination.limitItems);
    allPost = await dateHelper.formattedDate(allPost);

    res.render("admin/pages/blogs", {
        layout: "admin/layouts/default",
        allPost,
        title: "Bài viết",
        create: "/admin/blogs/create",
        search: "yes",
        keyword,
        detail: `${systemConfig.prefixAdmin}/blogs/detail`,
        create: `${systemConfig.prefixAdmin}/blogs/create`,
        edit: `${systemConfig.prefixAdmin}/blogs/edit`,
        del: `${systemConfig.prefixAdmin}/blogs/delete`,
        objectPagination
    })
}

module.exports.create = async (req, res) => {
    const allTags = await Tag.find({deleted: false}).select("name color");
    res.render("admin/pages/blogs/create", {
        layout: "admin/layouts/default",
        title: "Thêm mới", 
        allTags
    })
}

module.exports.createPost = async (req, res) => {
    console.log(req.body)
    res.send("OK");
}