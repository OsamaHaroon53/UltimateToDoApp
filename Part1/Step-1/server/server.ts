import * as express from "express";
import * as bodyParser from "body-parser";
const mongoose = require("mongoose");
import todoRouter from "./routes/todo"

class Server{
    app:express.Application;
    constructor(){
        this.app = express()
        this.config();
        this.routes()
    }

    private config() : void{
        const DB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/UltimateTodoApp";
        mongoose.Promise = global.Promise;
        mongoose.connect(DB_URI,{ useNewUrlParser: true },(err,res)=> err && console.log(`Failed To Connect To The Following DB_URIs ${DB_URI}`) || console.log(`Connected To The Following DB_URI ${DB_URI}`));
        this.app.set("port",process.env.PORT || 3000);
        this.app.use(bodyParser.json());
    }
    private routes() : void{

        this.app.use("/todo/api/v1.0/tasks",todoRouter)
    }
}

const server =  new Server().app;
var port = server.get("port");
server.listen(port,()=>{
    console.log(`Server Is Running On  ${server.get("port")}`);
})
module.exports = {server};