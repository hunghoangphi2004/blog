const mongoose = require('mongoose');
const generate = require("../helpers/generate.helper")

const AccountSchema = new mongoose.Schema(
    {
        fullname: String,
        email: String,
        password: String,
        token: {
            type: String,
            default: () => generate.generateRandomString(20)
        },
        deleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
)

const Account = mongoose.model('Account', AccountSchema, 'accounts')

module.exports = Account;