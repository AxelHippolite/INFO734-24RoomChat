const express = require('express');
const {checkUserNotAlreadyAuthenticated, isUserAuthenticated} = require("../middlewares/index.js");
const {logInUser, createUser, readAllUsers, deleteAllUsers} = require("../controllers/users.js");
const {createRoom, readAllRooms, readRoomsViewed, deleteAllRooms, deleteRoom} = require("../controllers/rooms.js");``
const {createMessage, readMessages, deleteAllMessages} = require("../controllers/messages.js");

const apiRouter = express.Router();

/* ===== Session Routes ===== */

apiRouter.get('/session', (req, res) => {
    res.json(req.session);
});

apiRouter.delete('/session', (req, res) => {
    if (req.session === undefined) {
        res.json("Il n'y a pas de session à détuire")
    }
    else {
        req.session.destroy()
        res.json("La session a été détruite !");
    }
});

/* ===== User Routes ===== */

apiRouter.post('/login', checkUserNotAlreadyAuthenticated, async (req, res) => {
    try{
        //const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        const result = await logInUser(req.body);

        req.session.userId = result.userId;
        req.session.username = result.username;
        res.json(result);
    }
    catch(e){
        res.status(401).send(e.message);
    }
});

apiRouter.delete('/logout', isUserAuthenticated, async (req, res) => {
    try {
        await req.session.destroy();
    } catch (e) {
    }
    res.clearCookie("connect.sid");
    res.end("La session a été détruite");
});

apiRouter.post('/user', async (req, res) => {
    try{
        res.json(await createUser(req.body));
    } catch(e){
        res.status(500);
    }
});

apiRouter.get('/users', async (req, res) => {
    try{
        res.json(await readAllUsers());
    } catch(e){
        res.status(500);
    }
});

apiRouter.delete('/deleteAll', async (req, res) => {
    try{
        res.json(await deleteAllUsers());
    } catch(e){
        res.status(500);
    }
});

/* ===== Rooms Routes ===== */

apiRouter.post('/room', async (req, res) => {
    try{
        res.json(await createRoom(req.body));
    } catch(e){
        res.status(500);
    }
});

apiRouter.get('/rooms', async (req, res) => {
    try{
        res.json(await readAllRooms());
    } catch(e){
        res.status(500);
    }
});

apiRouter.get('/roomsViewed/:userId', async (req, res) => {
    try{
        res.json(await readRoomsViewed(req.params.userId));
    } catch(e){
        res.status(500);
    }
});

apiRouter.delete('/deleteRoom/:roomCode', async (req, res) => {
    try{
        res.json(await deleteRoom(req.params.roomCode));
    } catch(e){
        res.status(500);
    }
});

apiRouter.delete('/deleteAllRooms', async (req, res) => {
    try{
        res.json(await deleteAllRooms());
    } catch(e){
        res.status(500);
    }
});

/* ===== Messages Routes ===== */

apiRouter.post('/message', async (req, res) => {
    try{
        res.json(await createMessage(req.body));
    } catch(e){
        res.status(500);
    }
});

apiRouter.get('/messages/:roomid', async (req, res) => {
    try{
        res.json(await readMessages(req.params.roomid));
    } catch(e){
        res.status(500);
    }
});

apiRouter.delete('/deleteAllMessages', async (req, res) => {
    try{
        res.json(await deleteAllMessages());
    } catch(e){
        res.status(500);
    }
});

module.exports = apiRouter;