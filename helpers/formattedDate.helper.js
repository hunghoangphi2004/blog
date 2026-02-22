module.exports.formattedDate = (posts) => {
    return posts.map(post => ({
        ...post,
        formattedDate: post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric"
            })
            : ""
    }));
};


module.exports.formattedDateOne = (post) => {
    return {
        ...post,
        formattedDate: post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric"
            })
            : ""
    }
}
