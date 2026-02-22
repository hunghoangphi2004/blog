const Post = require("../../models/post.model");
const dateHelper = require("../../helpers/formattedDate.helper")
const Tag = require("../../models/tag.model")
const tagHelper = require("../../helpers/colorTag.helper")

module.exports.detail = async (req, res) => {

    const slug = req.params.slug;

    let find = {
        status: "published",
        deleted: false
    }

    let post = await Post.findOne({ slug: slug, deleted: false }).lean();

    if (!post) {
        console.log("Không tồn tại post")
    }

    let recentPosts = await Post.find(find)
        .sort({ publishedAt: -1 })
        .limit(4)
        .lean();

    post = await dateHelper.formattedDateOne(post);
    post = await tagHelper.addTagColorForOne(post);
    recentPosts = await dateHelper.formattedDate(recentPosts)

    recentPosts = await tagHelper.addTagColor(recentPosts);

    res.render("client/pages/blogs/detail",
        {
            layout: "client/layouts/default",
            title: post.title,
            post,
            recentPosts
        }
    )
}