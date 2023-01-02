const {getKeysNotProvided} = require("../utils.js");
const {User} = require("../models/index.js");

const logInUser = async (headerAuthorization) => {
    //let [username, password] = Buffer.from(headerAuthorization, 'base64').toString().split(':');
    let username = headerAuthorization.username
    let password = headerAuthorization.password
    let userFound = await User.findOne({username: username, password: password});
    if (userFound !== null) {
        return {
            userId: userFound._id,
            username: userFound.username,
        }
    }
    throw new Error("No Account Found");
}

async function createUser(user){
    const neededKeys = ["username", "password", "email"];
    const keysNotGiven = getKeysNotProvided(neededKeys, user);
    if (keysNotGiven.length !== 0) {
        throw new Error("Empty Field");
    }
    try {
        const userToCreate = new User(user);
        return await userToCreate.save();
    }
    catch (e) {
        throw new Error("An Error Has Occured");
    }
}

async function readAllUsers() {
    try {
        return await User.find({})
    }
    catch (e) {
        throw new Error("An Error Has Occured");
    }
}

async function deleteAllUsers() {
    try {
        return await User.deleteMany({})
    }
    catch (e) {
        throw new Error("An Error Has Occured");
    }
}

module.exports = {
    logInUser: logInUser,
    createUser: createUser,
    readAllUsers: readAllUsers,
    deleteAllUsers: deleteAllUsers
}