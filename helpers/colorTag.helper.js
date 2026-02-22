const Tag = require("../models/tag.model")

module.exports.addTagColor = async (posts = []) => {

    for (const post of posts) {

        // nếu không có tags thì bỏ qua
        if (!post.tags || !Array.isArray(post.tags)) {
            post.tagsDetail = [];
            continue;
        }

        const tagIds = post.tags.map(t => t.tagId);

        const tags = await Tag.find({
            _id: { $in: tagIds }
        })
        .select("name slug color")
        .lean();

        post.tagsDetail = tags;
    }

    return posts;
}

module.exports.addTagColorForOne = async (post) => {
        const tagIds = post.tags.map(t => t.tagId);

        const tags = await Tag.find({
            _id: { $in: tagIds }
        })
            .select("name slug color")
            .lean();

        post.tagsDetail = tags
    return post;
}