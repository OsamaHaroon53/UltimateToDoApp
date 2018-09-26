const request = require('supertest');
import app from '../src/app';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
    dialect: 'mysql',
    operatorsAliases: Sequelize.Op as any,
    database: 'todo',
    username: 'root',
    password: 'root',
    modelPaths: [__dirname + '../src/models']
});
let server: any;
let sampleTodo: any;

describe("/todo/api/v1.0/", async () => {
    beforeEach(function () {
        server = require('../src/server');
        sampleTodo = {
            title: "Write test",
            description: "Testing post API",
            done: true
        };
        sequelize
            .authenticate()
            .then(() => {
                // console.log('Connection has been established successfully.');
            })
            .catch(err => {
                // console.error('Unable to connect to the database:', err);
            });
    });
    it("GET /", async () => {
        const res = await request(app).get('/');
        expect(res.text).toEqual("Welcome to Express as a TypeScript");
        expect(res.statusCode).toEqual(200);
    });

    it("GET /tasks", async () => {
        const res = await request(server).get('/todo/api/v1.0/tasks');
        expect(res.statusCode).toEqual(200);
    });

    // it("GET /tasks should return 404 if there is not any todos", async () => {
    //     const res = await request(server).get('/todo/api/v1.0/tasks');
    //     expect(res.statusCode).toEqual(404);
    // });

    it("GET /tasks/:id", async () => {
        const res = await request(server).get('/todo/api/v1.0/tasks/1');
        expect(res.statusCode).toEqual(200);
    });

    // it("GET /tasks/:id should return 404 if the todo with the given id does not exist", async () => {
    //     const res = await request(server).get('/todo/api/v1.0/tasks/1');
    //     expect(res.statusCode).toEqual(404);
    // });

    it("POST /tasks", async () => {
        const res = await request(server)
            .post('/todo/api/v1.0/tasks')
            .send(sampleTodo)
            .then(function(result:any){
                expect(result.body.title).toContain('Write test');
                expect(result.body.description).toContain('Testing post API');
                expect(result.body.done).toBeTruthy();
            });        
    });

    it("PUT /tasks/:id", async () => {
        const res = await request(server).put('/todo/api/v1.0/tasks/13')
            .send({ done: false });
        expect(res.statusCode).toEqual(200);
    });

    it("DELETE /tasks/:id", async () => {
        const res = await request(server).delete('/todo/api/v1.0/tasks/15');
        expect(res.statusCode).toEqual(200);
    });

    afterEach(async () => {
        await server.close();
        // sequelize.close();
    });
});