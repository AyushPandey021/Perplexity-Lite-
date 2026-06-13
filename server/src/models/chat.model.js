import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            trim: true,
            default: "New Chat",
        },
    },
    {
        timestamps: true,
    }
);

chatSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
        delete ret._id;
    },
});
export default mongoose.model("Chat", chatSchema);