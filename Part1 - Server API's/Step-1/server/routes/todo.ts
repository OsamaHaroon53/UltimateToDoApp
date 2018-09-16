import {Router,Response,Request} from "express";


class Todo {
    router:Router;
    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
         this.router.get("/",(req:Request,res:Response)=>{
            res.send({
                messag:"WORKING"
            })
         })
    }
}

const todoRoutes = new Todo();
todoRoutes.routes();
const todoRouter = todoRoutes.router
export default todoRouter;
