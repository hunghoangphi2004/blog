const mongoose = require("mongoose");

module.exports.connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Ket noi csdl thanh cong")
    } catch(err)
    {
        console.log(err)
    }
}