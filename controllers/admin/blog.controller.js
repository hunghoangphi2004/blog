const Post = require("../../models/post.model");
const Tag = require("../../models/tag.model");
const dateHelper = require("../../helpers/formattedDate.helper");
const systemConfig = require("../../config/system");
const tagHelper = require("../../helpers/colorTag.helper");
const filterStatusHelper = require("../../helpers/filterStatus.helper")

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    const filterStatus = filterStatusHelper(req.query);

    if (req.query.status) {
        find.status = req.query.status
    }

    let keyword = req.query.keyword || "";

    objectPagination = {
        limitItems: 4,
        currentPage: parseInt(req.query.page) || 1,
    }

    if (keyword) {
        find.title = new RegExp(keyword, "i");
        // objectPagination.currentPage = 1;
    }

    let countPost = await Post.countDocuments(find);
    let skip = objectPagination.limitItems * (objectPagination.currentPage - 1);
    let totalPage = Math.ceil(countPost / objectPagination.limitItems);

    objectPagination.skip = skip;
    objectPagination.totalPage = totalPage;

    let allPost = await Post.find(find).lean().skip(objectPagination.skip).limit(objectPagination.limitItems);
    allPost = await dateHelper.formattedDate(allPost);

    res.render("admin/pages/blogs", {
        layout: "admin/layouts/default",
        allPost,
        title: "Bài viết",
        create: "/admin/blogs/create",
        search: "yes",
        filterStatus: filterStatus,
        keyword,
        detail: `${systemConfig.prefixAdmin}/blogs/detail`,
        create: `${systemConfig.prefixAdmin}/blogs/create`,
        edit: `${systemConfig.prefixAdmin}/blogs/edit`,
        del: `${systemConfig.prefixAdmin}/blogs/delete`,
        objectPagination
    })
}

module.exports.create = async (req, res) => {
    const allTags = await Tag.find({ deleted: false }).select("name color");
    res.render("admin/pages/blogs/create", {
        layout: "admin/layouts/default",
        title: "Thêm mới",
        allTags
    })
}

module.exports.createPost = async (req, res) => {
    try {
        if (req.body.tags) {
            req.body.tags = req.body.tags.map(id => ({
                tagId: id
            }));
        }

        if (req.body.status = "published") {
            req.body.publishedAt = new Date();
        } else {
            req.body.publishedAt = null;
        }

        const newPost = await new Post(req.body);
        await newPost.save();

        req.flash("success", "Thêm bài viết thành công!");
        res.redirect(`${systemConfig.prefixAdmin}/blogs`);
    } catch (err) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
}

module.exports.detail = async (req, res) => {
    const id = req.params.id;
    let blog = await Post.findOne({ _id: id, deleted: false });

    blog = await tagHelper.addTagColorForOne(blog)

    if (!blog) {
        console.log("Không tồn tại post")
    }

    res.render("admin/pages/blogs/detail", {
        layout: "admin/layouts/default",
        title: "Chi tiết",
        blog
    })
}


module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const blog = await Post.findOne({ _id: id, deleted: false });
    const allTags = await Tag.find({ deleted: false }).select("name color");

    if (!blog) {
        console.log("Không tồn tại blog")
    }

    res.render("admin/pages/blogs/edit", {
        layout: "admin/layouts/default", title: "Cập nhật", blog, allTags
    })
}

module.exports.editPatch = async (req, res) => {
    try {
        req.body.tags = req.body.tags.map(id => ({
            tagId: id
        }));

        if (typeof (req.body.locked === "string")) {
            if (req.body.locked === "true") {
                req.body.locked = true;
            }
            else if (req.body.locked === "false") {
                req.body.locked = false;
            }
        }
        await Post.updateOne({ _id: req.params.id }, { ...req.body })
        req.flash("success", "Cập nhật bài viết thành công!");
        res.redirect(`${systemConfig.prefixAdmin}/blogs`);
    } catch (err) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
}


module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await Post.updateOne({ _id: id }, {
            ...req.body, deleted: true
        })
        req.flash("success", "Xoá bài viết thành công!");
        res.redirect(`${systemConfig.prefixAdmin}/blogs`);
    } catch (err) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }

}