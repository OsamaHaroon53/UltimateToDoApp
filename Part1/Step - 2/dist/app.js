"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.app = express_1.default();
        this.configuration();
        this.routes();
    }
    configuration() {
        const connection = mysql_1.default.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'todo'
        });
        connection.connect(function (err) {
            if (err)
                throw err;
            console.log('You are now connected...');
        });
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(cors_1.default());
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }
    routes() {
        const router = express_1.default.Router();
        this.app.use('/', router.get('/', (req, res) => {
            res.send("Welcome to Express as a TypeScript");
        }));
    }
}
exports.default = new App().app;
