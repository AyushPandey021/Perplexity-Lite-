import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessage(req, res) {
    try {
        const { message, chatId, chat, messages } = req.body;
        const requestedChatId = chatId || chat;

        if (!message?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }

        const currentUserId = req.userId || req.user?.id;

        if (!currentUserId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: user not authenticated",
            });
        }

        let chatDoc;
        let conversationHistory = [];

        if (requestedChatId) {
            chatDoc = await chatModel.findOne({ _id: requestedChatId, user: currentUserId });
            if (!chatDoc) {
                return res.status(404).json({
                    success: false,
                    message: "Chat not found",
                });
            }

            conversationHistory = Array.isArray(messages)
                ? messages
                : await messageModel
                    .find({ chat: chatDoc._id })
                    .sort({ createdAt: 1 })
                    .lean()
                    .then((items) =>
                        items.map((item) => ({
                            role: item.role,
                            content: item.content,
                        }))
                    );
        }

        const title = chatDoc ? chatDoc.title : await generateChatTitle(message);

        const aiResponse = await generateResponse([
            ...conversationHistory,
            { role: "user", content: message },
        ]);

        if (!chatDoc) {
            chatDoc = await chatModel.create({
                user: currentUserId,
                title,
                lastMessage: message,
            });
        } else {
            chatDoc.lastMessage = message;
            await chatDoc.save();
        }

        const userMessage = await messageModel.create({
            chat: chatDoc._id,
            content: message,
            role: "user",
        });

        const aiMessage = await messageModel.create({
            chat: chatDoc._id,
            content: aiResponse,
            role: "ai",
        });

        res.status(201).json({
            success: true,
            title,
            chat,
            userMessage,
            aiMessage,
            response: aiResponse,
        });
    } catch (error) {
        console.error("Send Message Error:", error);

        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}


export async function  getChats(req,res){
    const user = req.user
    const chats = await chatModel.find({user:user.id})
res.status(200).json({
    message:"chats retrived sucess",
    chats
})
}

export async function getMessages(req,res){
    const {chatId} = req.params

    const chat= await chatId.findOne({
        _id: chatId,
        user:req.user.id
    })
    if(!chat){
        return res.status(404).json({
            message:"chat not found"
        })
    }
    const messages = await messageModel.find({[
        chat: chatId
    ]})
}