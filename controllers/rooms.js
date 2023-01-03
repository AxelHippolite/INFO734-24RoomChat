const {getKeysNotProvided} = require("../utils.js");
const {Room} = require("../models/index.js");

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

async function deleteAllRooms() {
    try {
        return await Room.deleteMany({})
    }
    catch (e) {
        throw new Error("An Error Has Occured");
    }
}

module.exports = {
    createRoom: createRoom,
    readAllRooms: readAllRooms,
    deleteAllRooms: deleteAllRooms
}