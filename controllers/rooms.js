const {getKeysNotProvided} = require("../utils.js");
const {Message, Room} = require("../models/index.js");

async function createRoom(room){
    const neededKeys = ["name", "code"];
    const keysNotGiven = getKeysNotProvided(neededKeys, room);
    if (keysNotGiven.length !== 0) {
        throw new Error("Empty Field");
    }
    try {
        const roomToCreate = new Room(room);
        return await roomToCreate.save();
    }
    catch (e) {
        throw new Error("An Error Has Occured");
    }
}

async function readAllRooms() {
    try {
        return await Room.find({})
    }
    catch (e) {
        throw new Error("An Error Has Occured");
    }
}

async function readRoomsViewed(userid) {
    try {
        return await Message.find({userId : userid});
    }
    catch (e) {
        throw new Error("An Error Has Occured");
    }
}

async function deleteAllRooms() {
    try {
        const roomDeleted = await Room.deleteMany();
        await Message.deleteMany();
        return roomDeleted;
    }
    catch (e) {
        throw new Error("An Error Has Occured");
    }
}

async function deleteRoom(roomcode){
    try {
        const roomDeleted = await Room.remove({code: roomcode});
        await Message.remove({roomCode: roomcode});
        return roomDeleted;
    }
    catch (e) {
        throw new Error("An Error Has Occured");
    }
}

module.exports = {
    createRoom: createRoom,
    readAllRooms: readAllRooms,
    readRoomsViewed: readRoomsViewed,
    deleteRoom: deleteRoom,
    deleteAllRooms: deleteAllRooms
}