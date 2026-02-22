const Account = require("../../models/account.model");
const bcrypt = require("bcrypt");
const systemConfig = require("../../config/system.js")

module.exports.login = async (req, res) => {
    if (req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/blogs`);
    } else {
        res.render("admin/pages/auth/login", {layout: false, title: "Trang đăng nhập", prefixAdmin: systemConfig.prefixAdmin })
    }
}

module.exports.loginPost = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        const user = await Account.findOne({
            email: email,
            deleted: false,
        })

        if (!user) {
            req.flash("error", "Không tồn tại tài khoản");
            return res.redirect(req.get("referer"));
        } else {

        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            req.flash("error", "Mật khẩu không chính xác!");
            return res.redirect(req.get("referer"));
        }

        res.cookie("token", user.token)
        req.flash("success", "Đăng nhập thành công!");
        res.redirect(`${systemConfig.prefixAdmin}/blogs`);
    } catch (err) {
        req.flash("error", "Có lỗi xảy ra!");
        return res.redirect("back");
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie("token")
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}