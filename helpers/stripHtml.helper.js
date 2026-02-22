module.exports.stripHTML = (html) => {
    return html.replace(/<[^>]*>/g, "");
}
