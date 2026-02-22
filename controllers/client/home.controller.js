const Post = require("../../models/post.model");
const dateHelper = require("../../helpers/formattedDate.helper")
const Tag = require("../../models/tag.model")
const tagHelper = require("../../helpers/colorTag.helper")
const htmlHelper = require("../../helpers/stripHtml.helper")

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
    let limitItems = 6;
    let currentPage = parseInt(req.query.page) || 1;

    if (currentPage < 1) currentPage = 1;

    let countPosts = await Post.countDocuments(find);
    let totalPage = Math.ceil(countPosts / limitItems);

    if (currentPage > totalPage && totalPage > 0) {
        currentPage = totalPage;
    }

    let skip = limitItems * (currentPage - 1);

    let objectPagination = {
        limitItems,
        currentPage,
        totalPage,
        skip
    };

    let allPosts = await Post.find(find).lean().limit(objectPagination.limitItems).skip(objectPagination.skip);

    allPosts = await dateHelper.formattedDate(allPosts);
    allPosts = await tagHelper.addTagColor(allPosts);

    posts = posts.map(post => ({
        ...post,
        excerpt: htmlHelper.stripHTML(post.content).slice(0, 150)
    }));

    allPosts = allPosts.map(post => ({
        ...post,
        excerpt: htmlHelper.stripHTML(post.content).slice(0, 150)
    }));


    if (req.xhr) {
        return res.json({
            allPosts,
            objectPagination
        })
    }

    res.render("client/pages/home", {
        layout: "client/layouts/default",
        posts,
        allPosts,
        objectPagination,
        title: "Trang chủ"
    })
}

module.exports.about = async (req, res) => {
    res.render("client/pages/home/about", {
        layout: "client/layouts/default",
        title: "Giới thiệu"
    })
}
