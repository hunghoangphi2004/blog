const router = require("express").Router();
const blogController = require("../../controllers/admin/blog.controller");
const multer = require('multer');
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js");

router.get("/", blogController.index)
router.get("/create", blogController.create);
router.post("/create", upload.single('thumbnail'), uploadCloud.upload, blogController.createPost);

module.exports = router;