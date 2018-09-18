import { Router, Response, Request } from "express";
import Todo from "../models/todo";
import { ObjectID } from "bson";


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
        var _id = req.body._id ? new ObjectID(req.body._id) : new ObjectID();
        if(!ObjectID.isValid(_id)){
            throw "Invalid Object Id";
            return; 
        }
        let { title, description } = req.body
        var todo = new Todo({ title, description , _id })
        todo.save().then((result) => {
            res.status(201).send(result)
        }).catch((err) => {
            res.status(400).send(err)
        })
    }

    getTodo(req: Request, res: Response) {
        var { _id } = req.params;
        if(!ObjectID.isValid(_id)){
            throw {err:"Invalid Object Id"};
            return; 
        }
        Todo.findById(new ObjectID(_id)).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(400).send(err);
        })
    }

    deleteTodo(req: Request, res: Response) {
        var { _id } = req.params;
        if(!ObjectID.isValid(_id)){
            throw {err:"Invalid Object Id"};
            return; 
        }
        Todo.findByIdAndDelete(new ObjectID(_id)).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(400).send(err);
        })
    }

    updateTodo(req: Request, res: Response) {
        var { _id } = req.params;
        if(!ObjectID.isValid(_id)){
            throw {err:"Invalid Object Id"};
            return; 
        }
        var { title, description, done } = req.body
        Todo.findOneAndUpdate({_id:new ObjectID(_id)}, { _id: new ObjectID(_id), title, description, done }, { new: true }).then((result) => {
            res.status(201).send(result);
        }).catch((err) => {
            res.status(400).send(err);
        })
    }

    routes() {
        this.router.get("/", this.getAllTodo);
        this.router.post("/", this.PostTodo);
        this.router.get("/:_id", this.getTodo);
        this.router.delete("/:_id", this.deleteTodo);
        this.router.put("/:_id", this.updateTodo);


    }
}

const todoRoutes = new TodoRoute();
todoRoutes.routes();
const todoRouter = todoRoutes.router
export default todoRouter;
