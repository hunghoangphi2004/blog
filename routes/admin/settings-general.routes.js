const router = require("express").Router();
const settingController = require("../../controllers/admin/setting-general.controller");
const multer = require('multer');
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js");


router.get("/general", settingController.index);
router.patch("/general", upload.single('aboutAvatar'), uploadCloud.upload, settingController.generalPatch)

module.exports = router;