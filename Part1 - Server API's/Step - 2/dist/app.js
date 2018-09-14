"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mysql_1 = __importDefault(require("mysql"));
const app = express_1.default();
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
app.set("port", process.env.PORT || 3000);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.default = app;
