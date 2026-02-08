const uploadToCloudinary = require("../../helpers/uploadToCloudinary")

module.exports.upload = async (req, res, next) => {
    if (req.file) {
        const link = await uploadToCloudinary(req.file.buffer, "thumbnail");
        req.body[req.file.fieldname] = link;
        console.log(link)
    }
    next();
}
