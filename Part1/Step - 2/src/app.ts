import express from 'express';
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";
import { todo } from "./controllers/todo";


class App {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.configuration();
        this.routes();
    }
    public configuration() {
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
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
            );
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });

    }

    public routes() {
        const router: express.Router = express.Router();
        this.app.use('/', router.get('/', (req, res) => {
            res.send("Welcome to Express as a TypeScript");
        }));
        this.app.use('/todo/api/v1.0', todo);


    }
}

export default new App().app;