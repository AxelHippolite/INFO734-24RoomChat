const express = require("express");
const http = require("http");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const redis = require("redis");
const connectRedis = require("connect-redis");
const {Server} = require("socket.io");

const users = {};

const viewRouter = require("./routes/views.js");
const apiRouter = require("./routes/api.js");

const app = express();

app.use(cors({
    origin: (requestOrigin, callback) => callback(undefined, requestOrigin),
    credentials: true
}));

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const server = http.createServer(app);
server.listen(3000);

/* ===== SocketIO ===== */

const io = new Server(server, {
    cors: {
        origin: (requestOrigin, callback) => {
            callback(undefined, requestOrigin);
        },
        methods: ["GET", "POST"],
    },
});

io.on('connection', socket => {
    socket.on('userConnected', payload => {
        users[socket.id] = {
            id: socket.id,
            username: payload.username
        };
        socket.join(payload.room);
        socket.broadcast.to(payload.room).emit('userConnected', users[socket.id]);
    });

    socket.on('sendMessage', payload => {
        socket.join(payload.room);
        socket.broadcast.to(payload.room).emit('sendMessage', {
            user: payload.user,
            message: payload.message,
        });
    });
});

/* ===== MongoDB ===== */

const options = {
    keepAlive: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

const mongoDBHost = process.env.MONGO_HOST || "localhost";

mongoose.connect(`mongodb://${mongoDBHost}:27017/24room-bdd`, options, function (err) {
    if (err) {
        throw err;
    }
});

/* ===== REDIS ===== */

const RedisStore = connectRedis(session)
const redisHost = process.env.REDIS_HOST || "localhost";

const redisClient = redis.createClient({
    host: redisHost,
    port: 6379
})

redisClient.on('error', (err) => {
    console.log("Impossible d'établir une connexion avec redis. " + err);
});

redisClient.on('connect', () => {
    console.log("Connexion à redis avec succès");
});

app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: "JeSuisSecret!",
    domain: "localhost",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 86400000, // 86400000ms = 1 jour
        domain: "localhost"
    },
}));

/* ===== Routes ===== */
app.use('/', viewRouter);
app.use('/api', apiRouter);
