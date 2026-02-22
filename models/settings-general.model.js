const mongoose = require('mongoose');

const SettingGeneralSchema = new mongoose.Schema(
    {
        websiteName: { type: String, default: '' },
        phone: { type: String, default: '' },
        email: { type: String, default: '' },
        address: { type: String, default: '' },
        copyright: { type: String, default: '' },
        hero: { type: String, default: '' },
        aboutTitle: { type: String, default: '' },
        aboutAvatar: { type: String, default: '' },
        aboutContent: { type: String, default: '' },
    },
    {
        timestamps: true
    }
)

const SettingGeneral = mongoose.model('SettingGeneral', SettingGeneralSchema, 'settings-general')

module.exports = SettingGeneral;