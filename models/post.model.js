const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
    {
        title: String,
        slug: {
            type: String,
            slug: "title",
            unique: true
        },
        tags: [
            {
                tagId: {
                    type: String,
                    required: true
                }
            }
        ],
        content: String,
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft"
        },
        locked: {
            type: Boolean,
            default: false
        },

        publishedAt: {
            type: Date,
            default: null
        },
        thumbnail: String,
        createdBy: {
            // accountId: String,
            createdAt: {
                type: Date,
                default: Date.now()
            }
        },
        deleted: {
            type: Boolean,
            default: false
        }
    }
)

const Post = mongoose.model("Post", PostSchema, "posts");

module.exports = Post;


