const Post = require("../../models/post.model");
const dateHelper = require("../../helpers/formattedDate.helper")
const Tag = require("../../models/tag.model")
const tagHelper = require("../../helpers/colorTag.helper")

module.exports.detail = async (req, res) => {

    const slug = req.params.slug;

    let tag = await Tag.findOne({slug: slug, deleted: false});

    let allTags = await Tag.find({deleted: false});
    console.log(allTags)

    let posts = await Post.find({
        status: "published",
        deleted: false,
        "tags.tagId": tag._id.toString()
    }).sort({ publishedAt: -1 }).lean();

    posts = await dateHelper.formattedDate(posts);

    posts = await tagHelper.addTagColor(posts);


    res.render("client/pages/tags/detail",
        {
            layout: "client/layouts/default",
            title: tag.name,
            posts,
            allTags
        }
    )
}