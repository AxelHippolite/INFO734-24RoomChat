const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true
    },

    password: {
        type: Schema.Types.String,
        required: true
    },

    email: {
        type: Schema.Types.String,
        required: true
    },

    createdAt: {
        type: Schema.Types.Date,
        default: Date.now
    }
});

const RoomSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },

    code: {
        type: Schema.Types.String,
        required: true
    }
})

module.exports = {
    User: mongoose.model('user', UserSchema),
    Room: mongoose.model('room', RoomSchema)
}