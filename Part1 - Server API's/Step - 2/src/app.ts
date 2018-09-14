import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
const app = express();

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'todo'
});
connection.connect(function (err) {
    if (err) throw err;
    console.log('You are now connected...');
});

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;