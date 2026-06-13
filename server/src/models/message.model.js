import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "ai"],
            required: true,
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

messageSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

messageSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
        delete ret._id;
    },
});

export default mongoose.model("Message", messageSchema);