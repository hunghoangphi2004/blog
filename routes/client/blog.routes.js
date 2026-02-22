const router = require("express").Router();
const blogController = require("../../controllers/client/blog.controller")

router.get("/detail/:slug", blogController.detail)

module.exports = router;
