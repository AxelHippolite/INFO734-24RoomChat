const express = require('express');

const viewsRouter = express.Router();

viewsRouter.get('/rooms', function(req, res){
    res.render('roomsManage');
});

viewsRouter.get('/room', function(req, res){
    res.render('room');
});

viewsRouter.get('/signup', function(req, res){
    res.render('signup');
});

viewsRouter.get('/home', function(req, res){
    res.render('home');
});

module.exports = viewsRouter;