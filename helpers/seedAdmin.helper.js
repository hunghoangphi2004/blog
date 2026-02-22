const bcrypt = require("bcrypt");
const Account = require("../models/account.model");

module.exports = async () => {
    const existAdmin = await Account.findOne({});
    if (!existAdmin) {
        const hashedPassword = await bcrypt.hash("phihung9102004", 10);

        await Account.create({
            fullname: "Nguyễn Hoàng Phi Hưng",
            email: "nhph20049@gmail",
            password: hashedPassword
        })
        console.log("Đã tạo tài khoản admin mặc định")
    } else {
        console.log("Tài khoản admin đã tồn tại")
    }
}