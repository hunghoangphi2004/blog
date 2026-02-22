const mongoose = require("mongoose");
const seedAdmin = require("../helpers/seedAdmin.helper")

module.exports.connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Ket noi csdl thanh cong");

        await seedAdmin();
    } catch(err)
    {
        console.log(err)
    }
}