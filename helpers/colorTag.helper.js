const Tag = require("../models/tag.model")

module.exports.addTagColor = async (posts) => {
    for (const post of posts) {
        const tagIds = post.tags.map(t => t.tagId);

        const tags = await Tag.find({
            _id: { $in: tagIds }
        })
            .select("name color")
            .lean();

        post.tagsDetail = tags
    }
    return posts;
}