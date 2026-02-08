const router = require("express").Router();
const tagController = require("../../controllers/admin/tag.controller")
const tagValidate = require("../../validates/tag.validate")

router.get("/", tagController.index)
router.get("/create", tagController.create)
router.post("/create", tagValidate.createPost, tagController.createPost)
router.get("/detail/:id", tagController.detail)
router.get("/edit/:id", tagController.edit)
router.patch("/edit/:id", tagController.editPatch)
router.delete("/delete/:id", tagController.delete)

module.exports = router;