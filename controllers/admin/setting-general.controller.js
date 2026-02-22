const SettingGeneral = require("../../models/settings-general.model");

module.exports.index = async (req, res) => {
    const settingGeneral = await SettingGeneral.findOne({})

    res.render("admin/pages/settings-general", {
        layout: "admin/layouts/default",
        title: "Cài đặt chung",
        settingGeneral: settingGeneral
    })
}

// [PATCH] /admin/settings/general
module.exports.generalPatch = async (req, res) => {
    try {
        const settingGeneral = await SettingGeneral.findOne({});
        if (settingGeneral) {
            await SettingGeneral.updateOne({}, req.body);
        } else {
            const record = new SettingGeneral(req.body)
            await record.save()
        }
        req.flash("success", "Cập nhật thông tin thành công!");
        res.redirect(req.get("referer"));
    } catch (err) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
}