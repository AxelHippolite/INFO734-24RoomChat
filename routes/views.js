const express = require('express');
const {checkUserNotAlreadyAuthenticated, isUserAuthenticated} = require("../middlewares/index.js");

const viewsRouter = express.Router();

viewsRouter.get('/rooms', isUserAuthenticated, function(req, res){
    res.render('roomsManage');
});

viewsRouter.get('/room', isUserAuthenticated, function(req, res){
    res.render('room');
});

viewsRouter.get('/signup', function(req, res){
    res.render('signup');
});

viewsRouter.get('/home', function(req, res){
    res.render('home');
});

module.exports = viewsRouter;