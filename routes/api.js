const express = require('express');
const {checkUserNotAlreadyAuthenticated} = require("../middlewares/index.js");
const {logInUser, createUser, readAllUsers, deleteAllUsers} = require("../controllers/users.js");


const apiRouter = express.Router();

/**
apiRouter.get('/session', (req, res) => {
    res.json(req.session);
});
*/
apiRouter.delete('/session', (req, res) => {
    if (req.session === undefined) {
        res.json("Il n'y a pas de session à détuire")
    }
    else {
        req.session.destroy()
        res.json("La session a été détruite !");
    }
});


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

module.exports = apiRouter;