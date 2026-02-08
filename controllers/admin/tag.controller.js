const Tag = require("../../models/tag.model");
const systemConfig = require("../../config/system")

module.exports.index = async (req, res) => {
    let find = { deleted: false };
    let keyword = req.query.keyword || "";

    let objectPagination = {
        limitItems: 4,
        currentPage: parseInt(req.query.page) || 1,
    }

    if (keyword) {
        find.name = new RegExp(keyword, "i");
        // objectPagination.currentPage = 1;
    }

    let countTag = await Tag.countDocuments(find);
    let skip = objectPagination.limitItems * (objectPagination.currentPage - 1);
    let totalPage = Math.ceil(countTag / objectPagination.limitItems);
    objectPagination.skip = skip;
    objectPagination.totalPage = totalPage

    let allTag = await Tag.find(find).lean().skip(objectPagination.skip).limit(objectPagination.limitItems);

    res.render("admin/pages/tags", {
        layout: "admin/layouts/default",
        allTag,
        title: "Thể loại",
        search: "yes",
        keyword,
        detail: `${systemConfig.prefixAdmin}/tags/detail`,
        create: `${systemConfig.prefixAdmin}/tags/create`,
        edit: `${systemConfig.prefixAdmin}/tags/edit`,
        del: `${systemConfig.prefixAdmin}/tags/delete`,
        objectPagination
    })
}

module.exports.detail = async (req, res) => {
    const search = null;
    const create = null;

    const id = req.params.id;
    const tag = await Tag.findOne({ _id: id, deleted: false });
    if (!tag) {
        console.log("Không tồn tại tag")
    }

    res.render("admin/pages/tags/detail", {
        layout: "admin/layouts/default", title: "Chi tiết", search, create, tag
    })
}

module.exports.create = async (req, res) => {
    const search = null;
    const create = null;
    res.render("admin/pages/tags/create", {
        layout: "admin/layouts/default", title: "Thêm mới", search, create
    })
}

module.exports.createPost = async (req, res) => {
    try {
        const tag = new Tag(req.body);
        await tag.save();
        res.redirect(`${systemConfig.prefixAdmin}/tags`);
    } catch (err) {
        console.log(err)
    }
}

module.exports.edit = async (req, res) => {
    const search = null;
    const create = null;

    const id = req.params.id;
    const tag = await Tag.findOne({ _id: id, deleted: false });
    if (!tag) {
        console.log("Không tồn tại tag")
    }

    res.render("admin/pages/tags/edit", {
        layout: "admin/layouts/default", title: "Cập nhật", search, create, tag
    })
}

module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    await Tag.updateOne({ _id: id }, {
        ...req.body
    })
    res.redirect(`${systemConfig.prefixAdmin}/tags`);
}

module.exports.delete = async (req, res) => {
    const id = req.params.id;
    await Tag.updateOne({ _id: id }, {
        ...req.body, deleted: true
    })
    res.redirect(`${systemConfig.prefixAdmin}/tags`);
}