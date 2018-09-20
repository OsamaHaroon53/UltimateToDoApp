import { Response, Request, Router } from "express";
import todo from "../models/todo";
import server from "../server";

export class todoApp {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    // get all of the tasks from the database
    public getData(req: Request, res: Response): void {
        todo.find()
            .then((data) => {
                res.status(200).send({
                    message: 'Tasks send succesfully',
                    data: data
                });
            })
            .catch((error) => {
                res.status(500).send({ error: error });
            });
    }
    // create a new task
    public createTodo(req: Request, res: Response): void {
        const data = new todo({
            title: req.body.title,
            description: req.body.description,
        });
        if (req.body.hasOwnProperty("done"))
            data['done'] = req.body.done;
        data.save()
            .then((data) => {
                res.status(201).send({
                    message: 'Create task succesfully',
                    data: data
                });
            })
            .catch((error) => {
                res.status(500).send({ error: error });
            });
    }
    // get a single todo
    public getOne(req: Request, res: Response): void {
        todo.findOne({ _id: req.params.id })
            .then((data) => {
                res.status(200).send({
                    message: 'get one task succesfully',
                    data: data
                });
            })
            .catch((error) => {
                res.status(500).send({ error: error });
            });
    }


    // update todo
    public update(req: Request, res: Response): void {

        todo.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then((data) => {
                res.status(200).send({
                    message: 'Update task succesfully',
                    data: data
                });
            })
            .catch((error) => {
                res.status(500).send({ error: error });
            });
    }

    // delete todo
    public delete(req: Request, res: Response): void {

        todo.findOneAndRemove({ _id: req.params.id })
            .then(() => {
                res.status(204).end();
            })
            .catch((error) => {
                res.status(500).send({ error: error });
            });
    }
    public routes() {
        this.router.get('/tasks', this.getData);
        this.router.post('/tasks', this.createTodo);
        this.router.get('/tasks/:id', this.getOne);
        this.router.put('/tasks/:id', this.update);
        this.router.delete('/tasks/:id', this.delete);
    }
}
const todo1 = new todoApp();
todo1.routes();
export default todo1.router;
