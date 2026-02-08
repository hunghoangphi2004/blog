const router = require("express").Router();
const homeController = require("../../controllers/client/home.controller")

router.get("/", homeController.index)
router.get("/about", homeController.about)

module.exports = router;
