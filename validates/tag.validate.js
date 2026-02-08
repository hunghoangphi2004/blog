module.exports.createPost = async (req, res, next) => {
    if (!req.body.name) {
        console.log("Tên không được để trống")
        res.redirect(req.get("referer"));
        return;
    }
    next();
}