const router = require("express").Router();
const tagController = require("../../controllers/client/tag.controller")

router.get("/:slug", tagController.detail)

module.exports = router;
