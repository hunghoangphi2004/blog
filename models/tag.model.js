const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const TagSchema = new mongoose.Schema(
    {
        name: String,
        slug: {
            type: String,
            slug: "name",
            unique: true
        },
        color: {
            bg: String,
            text: String
        },
        deleted: {
            type: Boolean,
            default: false
        }
    }
)

const Tag = mongoose.model("Tag", TagSchema, "tags");

module.exports = Tag;


