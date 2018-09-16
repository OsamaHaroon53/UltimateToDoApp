import * as express from "express";
import * as bodyParser from "body-parser";


class Server{
    app:express.Application;
    constructor(){
        this.app = express()
        this.config();
        this.routes()
    }

    private config() : void{
        const mongoose = require("mongoose");
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/UltimateTodoApp");
        this.app.set("port",process.env.PORT||3000);
        this.app.use(bodyParser.json());
    }
    private routes() : void{

        this.app.use("/",(req,res)=>{
            res.send("Working")
        })
    }
}

const server =  new Server().app;
server.listen(server.get("port"),()=>{
    console.log(`Server Is Running On  ${server.get("port")}`);
})
module.exports = server;