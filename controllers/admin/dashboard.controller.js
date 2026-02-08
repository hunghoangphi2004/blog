module.exports.index = async (req, res) => {
    res.render("admin/pages/dashboard", {
        layout: "admin/layouts/default", title: "Tổng quan"
    })
}