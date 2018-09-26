"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const todo_1 = require("./routes/todo");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://user:osama53@ds157762.mlab.com:57762/todo_data', { useNewUrlParser: true });
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'CONNECTION ERROR :'));
        db.once('open', () => {
            console.log('CONNECTION OPENED!!');
            return db;
        });
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }
    // application routes
    routes() {
        const router = express.Router();
        this.app.use('/', router.get('/', (req, res) => {
            res.status(200).send("Welcome to Express");
        }));
        this.app.use('/todo/api/v1.0', todo_1.default);
    }
}
exports.default = new Server().app;
//# sourceMappingURL=server.js.map