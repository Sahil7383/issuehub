const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["open", "in-progress", "resolved"],
            default: "open",
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Issue", issueSchema);