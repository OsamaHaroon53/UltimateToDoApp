import { Router, Response, Request } from "express";
import Todo from "../models/todo";


class TodoRoute {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    getAllTodo(req: Request, res: Response) {
        Todo.find().then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
            res.status(400).send(err)
        })
    }

    PostTodo(req: Request, res: Response) {
        let { title, description } = req.body
        var todo = new Todo({ title, description })
        todo.save().then((result) => {
            res.status(201).send(result)
        }).catch((err) => {
            res.status(400).send(err)
        })
    }

    getTodo(req: Request, res: Response) {
        var { _id } = req.params;
        Todo.findById(_id).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(400).send(err);
        })
    }

    deleteTodo(req: Request, res: Response) {
        var { _id } = req.params;
        Todo.findByIdAndDelete(_id).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(400).send(err);
        })
    }

    updateTodo(req: Request, res: Response){
        var { _id } = req.params;
        var {title , description , done} = req.body
        Todo.findOneAndUpdate(_id,{title , description , done},{new:true}).then((result) => {
            res.status(201).send(result);
        }).catch((err) => {
            res.status(400).send(err);
        })
    }

    routes() {
        this.router.get("/", this.getAllTodo);
        this.router.post("/", this.PostTodo);
        this.router.get("/:_id", this.getTodo);
        this.router.delete("/:_id",this.deleteTodo);
        this.router.put("/:_id",this.updateTodo);


    }
}

const todoRoutes = new TodoRoute();
todoRoutes.routes();
const todoRouter = todoRoutes.router
export default todoRouter;
