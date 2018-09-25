"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_1 = require("../models/todo");
class todoApp {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    // get all of the tasks from the database
    getData(req, res) {
        todo_1.default.find()
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
    createTodo(req, res) {
        const data = new todo_1.default({
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
    getOne(req, res) {
        todo_1.default.findOne({ _id: req.params.id })
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
    update(req, res) {
        todo_1.default.findOneAndUpdate({ _id: req.params.id }, req.body)
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
    delete(req, res) {
        todo_1.default.findOneAndRemove({ _id: req.params.id })
            .then(() => {
            res.status(204).end();
        })
            .catch((error) => {
            res.status(500).send({ error: error });
        });
    }
    routes() {
        this.router.get('/tasks', this.getData);
        this.router.post('/tasks', this.createTodo);
        this.router.get('/tasks/:id', this.getOne);
        this.router.put('/tasks/:id', this.update);
        this.router.delete('/tasks/:id', this.delete);
    }
}
exports.todoApp = todoApp;
const todo1 = new todoApp();
todo1.routes();
exports.default = todo1.router;
//# sourceMappingURL=todo.js.map