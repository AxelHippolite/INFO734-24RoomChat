const {getKeysNotProvided} = require("../utils.js");
const {Message} = require("../models/index.js");

async function createMessage(message){
    const neededKeys = ["content", "userId", "username", "roomCode", "createdAt"];
    const keysNotGiven = getKeysNotProvided(neededKeys, message);
    if (keysNotGiven.length !== 0) {
        throw new Error("Empty Field");
    }
    try {
        const messageToCreate = new Message(message);
        return await messageToCreate.save();
    }
    catch (e) {
        throw new Error("An Error Has Occured");
    }
}

async function readMessages(roomid) {
    try {
        return await Message.find({roomCode: roomid})
    }
    catch (e) {
        throw new Error("An Error Has Occured");
    }
}

module.exports = {
    createMessage: createMessage,
    readMessages: readMessages
}